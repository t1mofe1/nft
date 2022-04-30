import { Tooltip, Button, Icon, Fade } from "@mui/material";
import { INftActionButton } from "../models/nft";

interface INftActionButtonProps {
  button: INftActionButton;
}
const NftActionButton = ({ button }: INftActionButtonProps) => {
  return (
    <Tooltip
      key={"btn-" + button.key}
      title={button.name}
      placement="bottom"
      arrow
      PopperProps={{
        disablePortal: true,
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 200 }}
    >
      <Button>
        <Icon>{button.icon}</Icon>
      </Button>
    </Tooltip>
  );
};

export default NftActionButton;
