import React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import { IBlockChain } from "../../models/blockchain";
import { Stack } from "@mui/material";

interface IAddressProps {
  blockchains: Array<IBlockChain>;
}

const NftCollectionBlockChains = ({ blockchains }: IAddressProps) => {
  return (
    <Stack direction="row" spacing={0}>
      {blockchains?.map((blockchain) => {
        return (
          <Tooltip
            title={blockchain.name}
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
              src={blockchain.logo}
              sx={{ width: "16px", height: "16px;", mt: 1 }}
            />
          </Tooltip>
        );
      })}
    </Stack>
  );
};
export default NftCollectionBlockChains;
