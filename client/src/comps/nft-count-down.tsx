import React, { useState, useEffect } from "react";
import {
  Typography,
  Tooltip,
  Icon,
  Fade,
  Box,
  Divider,
  Stack,
} from "@mui/material";
interface INtfCountdown {
  end: Date;
}

const NftCountdown = ({ end }: INtfCountdown) => {
  const calculateTimeLeft = (end: Date) => {
    const difference = end.getTime() - new Date().getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    console.log(timeLeft);
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(end));
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(end));
    }, 1000);
  });

  return (
    <>
      <Divider />
      <Typography
        variant="body2"
        color="secondary"
        sx={{ textAlign: "center", mt: 2 }}
      >
        Sale ends in&nbsp;
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Tooltip
          title={`Sale ends on ${end}`}
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
          }}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 200 }}
        >
          <Icon>{"alarm"}</Icon>
        </Tooltip>
        <Typography variant="body2">
          {timeLeft.days} days&nbsp;
          {timeLeft.hours} hours&nbsp;
          {timeLeft.minutes} minutes&nbsp;
          {timeLeft.seconds} seconds&nbsp;
        </Typography>
      </Stack>
    </>
  );
};
export default NftCountdown;
