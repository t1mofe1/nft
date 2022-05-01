import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "./auth-context";
import { UpdateAccount } from "../api/account";
import { useSignedGraphqlMutation } from "../services/signed-mutation";

interface IProfileNicknameProps {
  accountId: string;
  defaultValue: string;
}

export const ProfileNickname = ({
  accountId,
  defaultValue,
}: IProfileNicknameProps) => {
  const { isLogged, refresh } = useAuth();

  const [isEdit, setEdit] = React.useState(false);
  const [isHover, setHover] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  const { isLoading, invoke } = useSignedGraphqlMutation({
    mutation: new UpdateAccount(String(accountId), {
      nickname: value,
    }),
    onSuccess: () => refresh(),
    onError: () => {},
  });

  React.useEffect(() => {
    if (isEdit == false) {
      if (value !== defaultValue) {
        if (isLogged === true) {
          invoke();
        }
      }
    }
  }, [isEdit]);

  return (
    <Stack
      direction="row"
      onMouseEnter={() => setHover(isLogged)}
      onMouseLeave={() => setHover(false)}
    >
      {!isEdit && (
        <Typography
          sx={{ mx: 2, fontSize: 25, textTransform: "initial" }}
          variant="h4"
        >
          {value}
        </Typography>
      )}
      {isLogged && (
        <React.Fragment>
          {isHover && !isEdit && (
            <IconButton size="small" onClick={() => setEdit(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          {isEdit && (
            <TextField
              autoFocus
              size="small"
              value={value}
              onBlur={() => setEdit(false)}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEdit(false);
                }
              }}
            />
          )}
          {isLoading && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size=".9rem" />
            </Box>
          )}
        </React.Fragment>
      )}
    </Stack>
  );
};
