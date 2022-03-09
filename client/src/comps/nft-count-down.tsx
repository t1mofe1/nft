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
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
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
        <Box component={Typography}>{timeLeft.days} days</Box>
        <Box component={Typography}>{timeLeft.hours} hours</Box>
        <Box component={Typography}>{timeLeft.minutes} minutes</Box>
        <Box component={Typography}>{timeLeft.seconds} seconds</Box>
      </Stack>
    </>
  );
};
export default NftCountdown;
