import React, { useState, useEffect } from "react";
import { Typography, Tooltip, Icon, Fade, Stack } from "@mui/material";
interface INtfCountdown {
  end: Date;
  concise?: boolean;
}
interface INftTimeDifference {
  difference: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const NftCountdown = ({ end, concise = false }: INtfCountdown) => {
  const calculateTimeLeft = (end: Date) => {
    const difference = end.getTime() - new Date().getTime();
    return {
      difference: difference,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState<INftTimeDifference>(
    calculateTimeLeft(end)
  );
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(end));
    }, 1000);
  });

  const getConciseCountdown = () => {
    if (timeLeft.days > 0)
      return (
        <>
          <Typography variant="h6">{timeLeft.days!}</Typography>
          <Typography variant="body2"> days</Typography>
        </>
      );
    if (timeLeft.hours! > 0)
      return (
        <>
          <Typography variant="h6">{timeLeft.hours!}</Typography>
          <Typography variant="body2"> hours</Typography>
        </>
      );
    if (timeLeft.minutes > 0)
      return (
        <>
          <Typography variant="h6">{timeLeft.minutes}</Typography>
          <Typography variant="body2"> minutes</Typography>
        </>
      );
    if (timeLeft.seconds > 0)
      return (
        <>
          <Typography variant="h6">{timeLeft.seconds}</Typography>
          <Typography variant="body2"> seconds</Typography>
        </>
      );
  };

  return concise ? (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="body2">in </Typography>
      {getConciseCountdown()}
    </Stack>
  ) : (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
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
    </Stack>
  );
};
export default NftCountdown;
