import React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import { IProfileAddress } from "../../models/profile";

interface IAddressProps {
  address: IProfileAddress;
}

const ProfileAddress = ({ address }: IAddressProps) => {
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
      key={"address-" + address.key}
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
            sx={{ width: "16px", height: "16px;" }}
          />
        </Tooltip>
      }
      label={
        <Tooltip
          title={tooltipCopiedOpen ? "Copied" : "Click to copy"}
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
          }}
          open={tooltipCopyOpen || tooltipCopiedOpen}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 200 }}
          disableFocusListener
          disableHoverListener
          disableTouchListener
        >
          <Typography
            variant="body1"
            style={{ cursor: "pointer" }}
            onClick={handleTooltipCopiedOpen}
            onMouseEnter={handleTootltipCopyOpen}
            onMouseLeave={handleTooltipsClose}
          >
            {address.address.substr(0, 6) +
              " ... " +
              address.address.substr(-4)}
          </Typography>
        </Tooltip>
      }
      sx={{ px: 2, py: 2, mr: 2 }}
      size="medium"
    />
  );
};
export default ProfileAddress;
