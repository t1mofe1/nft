import React from "react";
import { useAuth } from "./auth-context";
import { UpdateAccount } from "../api/account";
import { ImageSelector } from "./image-selector";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import { useSignedGraphqlMutation } from "../services/signed-mutation";

interface IProfileCoverProps {
  src?: string;
  alt?: string;
  accountId?: string;
}

export const ProfileCover = ({ src, alt, accountId }: IProfileCoverProps) => {
  const { isLogged, refresh } = useAuth();

  const [isHover, setHover] = React.useState(false);
  const [value, setValue] = React.useState(String(src));

  const { isLoading, invoke } = useSignedGraphqlMutation({
    mutation: new UpdateAccount(String(accountId), {
      cover: value,
    }),
    onSuccess: () => refresh(),
    onError: () => {},
  });

  React.useEffect(() => {
    if (src !== value) {
      if (isLogged === true) {
        invoke();
      }
    }
  }, [value]);

  return (
    <Box
      sx={{
        zIndex: 1,
        width: "100%",
        height: "250px",
        position: "relative",
      }}
      onMouseEnter={() => setHover(isLogged)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        component="img"
        src={value}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          objectFit: "cover",
          flexDirection: "column",
        }}
      />
      {isLogged && (
        <Backdrop
          sx={{
            color: "#fff",
            position: "absolute",
            display: isHover ? "flex" : "none",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isHover || Boolean(isLoading)}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ImageSelector
              onChange={(file) => {
                setValue(file.data);
              }}
            />
          )}
        </Backdrop>
      )}
    </Box>
  );
};
