import React from "react";
import { useAuth } from "./auth-context";
import { UpdateAccount } from "../api/account";
import { ImageSelector } from "./image-selector";
import { useGraphqlMutation } from "../services/gql/mutation";
import { Box, Avatar, Backdrop, CircularProgress } from "@mui/material";

interface IProfileAvatarProps {
  src?: string;
  alt?: string;
  accountId?: string;
}

export const ProfileAvatar = ({ src, alt, accountId }: IProfileAvatarProps) => {
  const { isLogged, refresh } = useAuth();

  const [isHover, setHover] = React.useState(false);
  const [value, setValue] = React.useState(String(src));

  const { isLoading, invoke } = useGraphqlMutation({
    mutation: new UpdateAccount(String(accountId), {
      avatar: value,
    }),
    onSuccess: () => refresh(),
    onError: () => {},
  });

  React.useEffect(() => {
    if (src !== value) {
      if (isLoading === true) {
        invoke();
      }
    }
  }, [value]);

  return (
    <Box
      sx={{
        width: 200,
        height: 200,
        marginTop: -10,
        overflow: "hidden",
        borderRadius: "50%",
        position: "relative",
      }}
      onMouseEnter={() => setHover(isLogged)}
      onMouseLeave={() => setHover(false)}
    >
      <Avatar
        alt={alt}
        style={{
          width: 200,
          height: 200,
          border: "5px solid #fff",
        }}
        src={value}
      />
      {isLogged && (
        <Backdrop
          sx={{
            color: "#fff",
            position: "absolute",
            display: isHover ? "flex" : "none",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isHover}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ImageSelector onChange={(file) => setValue(file.data)} />
          )}
        </Backdrop>
      )}
    </Box>
  );
};
