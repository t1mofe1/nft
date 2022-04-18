import React from "react";
import { Typography, Tooltip, Icon, Fade, Stack } from "@mui/material";
import { INftTimeDifference } from "../models/nft";
interface INtfCountdown {
  end: Date;
  timeLeft: INftTimeDifference;
  concise?: boolean;
}

interface INftConciseCounterProps {
  timeLeft: INftTimeDifference;
}
const NftConciseCounter = ({ timeLeft }: INftConciseCounterProps) => {
  if (parseInt(timeLeft.days, 10) > 0)
    return (
      <>
        <Typography variant="h6">{timeLeft.days!}</Typography>
        <Typography variant="body2"> days</Typography>
      </>
    );
  if (parseInt(timeLeft.hours, 10) > 0)
    return (
      <>
        <Typography variant="h6">{timeLeft.hours}</Typography>
        <Typography variant="body2"> hours</Typography>
      </>
    );
  if (parseInt(timeLeft.minutes, 10) > 0)
    return (
      <>
        <Typography variant="h6">{timeLeft.minutes}</Typography>
        <Typography variant="body2"> minutes</Typography>
      </>
    );
  if (parseInt(timeLeft.seconds, 10) > 0)
    return (
      <>
        <Typography variant="h6">{timeLeft.seconds}</Typography>
        <Typography variant="body2"> seconds</Typography>
      </>
    );
  return <></>;
};
interface INftCounterProps {
  end: Date;
  timeLeft: INftTimeDifference;
}
const NftCounter = ({ end, timeLeft }: INftCounterProps) => {
  if (timeLeft.difference)
    return (
      <>
        <Tooltip
          title={`Ends on ${end.toLocaleString("en-GB", {
            timeZone: "CET",
          })}`}
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
          }}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 200 }}
        >
          <Icon sx={{ marginTop: "-5px" }}>{"alarm"}</Icon>
        </Tooltip>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6">{timeLeft.days}</Typography>
          <Typography variant="body2">days&nbsp;</Typography>
          <Typography variant="h6">{timeLeft.hours}</Typography>
          <Typography variant="body2">hours&nbsp;</Typography>
          <Typography variant="h6">{timeLeft.minutes}</Typography>
          <Typography variant="body2">minutes&nbsp;</Typography>
          <Typography variant="h6">{timeLeft.seconds}</Typography>
          <Typography variant="body2">seconds&nbsp;</Typography>
        </Stack>
      </>
    );
  return <></>;
};
const NftCountdown = ({ end, timeLeft, concise = false }: INtfCountdown) => {
  return concise ? (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="body2">in </Typography>
      <NftConciseCounter timeLeft={timeLeft} />
    </Stack>
  ) : (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <NftCounter timeLeft={timeLeft} end={end} />
    </Stack>
  );
};
export default NftCountdown;
