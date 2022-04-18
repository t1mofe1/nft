import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Stack,
  Icon,
  Button,
  Box,
  Paper,
  Tooltip,
  Fade,
  TextField,
  InputAdornment,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";

import { INftTimeDifference } from "../../models/nft";

interface IBigmintCountdownProps {
  bigmint: Date;
}

export const BigmintCountdown = ({ bigmint }: IBigmintCountdownProps) => {
  const calculateTimeLeft = (end: Date) => {
    const difference = end.getTime() - new Date().getTime(),
      days = Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours = Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((difference / 1000 / 60) % 60),
      seconds = Math.floor((difference / 1000) % 60);
    return {
      difference: difference > 0 ? difference : 0,
      days: difference > 0 ? (days > 9 ? days + "" : "0" + days) : "00",
      hours: difference > 0 ? (hours > 9 ? hours + "" : "0" + hours) : "00",
      minutes:
        difference > 0 ? (minutes > 9 ? minutes + "" : "0" + minutes) : "00",
      seconds:
        difference > 0 ? (seconds > 9 ? seconds + "" : "0" + seconds) : "00",
    };
  };
  const [timeLeft, setTimeLeft] = useState<INftTimeDifference>(
    calculateTimeLeft(bigmint)
  );
  useEffect(() => {
    if (timeLeft)
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft(bigmint));
      }, 1000);
  }, [timeLeft, bigmint]);

  return (
    <Grid container spacing={0} sx={{ py: 10 }}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Typography variant="h2" color="secondary">
            BIG MINT
            <Typography variant="h2" component="span">
              {" "}
              is neigh!
            </Typography>
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          <Stack direction="column" alignItems="center">
            <Typography variant="body2">DAYS</Typography>
            <Typography variant="h1">{timeLeft.days}</Typography>
          </Stack>

          <Stack direction="column" alignItems="center">
            <Typography variant="body2">HOURS</Typography>
            <Typography variant="h1">{timeLeft.hours}</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography variant="body2">MINUTES</Typography>
            <Typography variant="h1">{timeLeft.minutes}</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography variant="body2">SECONDS</Typography>
            <Typography variant="h1">{timeLeft.seconds}</Typography>
          </Stack>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          spacing={2}
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Typography variant="body2">
            Get notified when the mint begins
          </Typography>
          <TextField
            size="small"
            label="Email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button size="large">Send</Button>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
