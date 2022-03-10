import React from "react";
import { Box, Stack, Tooltip, Fade } from "@mui/material";
import { IRenderLanguage, IRenderLibrary } from "../models/nft";

interface INftRendererIcons {
  renderer: {
    language: IRenderLanguage;
    library?: IRenderLibrary;
  };
}
const NftRendererIcons = ({ renderer }: INftRendererIcons) => {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip
        title={renderer.language.name}
        placement="top"
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 200 }}
      >
        <Box
          component="img"
          src={renderer.language.logo}
          sx={{
            width: "16px",
            height: "16px",
          }}
        />
      </Tooltip>
      {renderer.library && (
        <Tooltip
          title={renderer.library.name}
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
          }}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 200 }}
        >
          <Box
            component="img"
            src={renderer.library.logo}
            sx={{
              width: "16px",
              height: "16px",
            }}
          />
        </Tooltip>
      )}
    </Stack>
  );
};
export default NftRendererIcons;
