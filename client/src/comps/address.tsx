import React from "react";

import { Typography, Fade, Tooltip } from "@mui/material";

interface IAddressProps {
  address: string;
  variant?:
    | "body1"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body2"
    | "overline"
    | undefined;
  color?: string;
}

export const Address = ({
  address,
  variant = "body1",
  color = "main",
}: IAddressProps) => {
  const [tooltipCopiedOpen, setTooltipCopiedOpen] = React.useState(false);
  const [tooltipCopyOpen, setTooltipCopyOpen] = React.useState(false);

  const handleTooltipsClose = () => {
    setTooltipCopyOpen(false);
    setTooltipCopiedOpen(false);
  };

  const handleTooltipCopiedOpen = () => {
    navigator.clipboard.writeText(address);
    setTooltipCopyOpen(false);
    setTooltipCopiedOpen(true);
  };
  const handleTootltipCopyOpen = () => {
    setTooltipCopyOpen(true);
  };
  return (
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
        variant={variant}
        color={color}
        style={{ cursor: "pointer" }}
        onClick={handleTooltipCopiedOpen}
        onMouseEnter={handleTootltipCopyOpen}
        onMouseLeave={handleTooltipsClose}
      >
        {address.substr(0, 6) + " ... " + address.substr(-4)}
      </Typography>
    </Tooltip>
  );
};
