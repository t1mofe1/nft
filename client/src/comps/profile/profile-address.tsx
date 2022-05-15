import React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import { IProfileAddress } from "../../models/profile";
import { Address } from "../address";

interface IAddressProps {
  address: IProfileAddress;
}

export const ProfileAddress = ({ address }: IAddressProps) => {
  const [tooltipCopiedOpen, setTooltipCopiedOpen] = React.useState(false);
  const [tooltipCopyOpen, setTooltipCopyOpen] = React.useState(false);

  const handleTooltipsClose = () => {
    setTooltipCopyOpen(false);
    setTooltipCopiedOpen(false);
  };

  const handleTooltipCopiedOpen = () => {
    navigator.clipboard.writeText(address.address);
    setTooltipCopyOpen(false);
    setTooltipCopiedOpen(true);
  };
  const handleTootltipCopyOpen = () => {
    setTooltipCopyOpen(true);
  };
  return (
    <Chip
      key={"address-" + address.address}
      clickable={true}
      icon={
        <Tooltip
          title={address.blockchain.name}
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
            src={address.blockchain.logo}
            sx={{ width: "18px" }}
          />
        </Tooltip>
      }
      label={<Address address={address.address} variant="body2" />}
      sx={{ px: 2, py: 2, mr: 2 }}
      size="medium"
    />
  );
};
