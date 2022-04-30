import React from "react";
import {
  Box,
  Step,
  Button,
  StepButton,
  Stepper as MuiStepper,
  Container,
} from "@mui/material";

interface IStepperProps {
  steps: Array<{ label: string; component: React.ReactElement }>;
  onNext?: () => Boolean;
  onBack?: () => Boolean;
}

export const Stepper = ({
  steps,
  onNext = () => true,
  onBack = () => true,
}: IStepperProps) => {
  const [step, setStep] = React.useState(0);

  return (
    <Box>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <MuiStepper activeStep={step}>
          {steps.map(({ label }, index) => (
            <Step key={label} completed={index < step}>
              <StepButton color="inherit" onClick={() => setStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </MuiStepper>
      </Container>
      {steps[step].component}
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          {step > 0 && (
            <Button
              color="inherit"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          )}
          <Box sx={{ flex: "1 1 auto" }} />
          {step < steps.length - 1 && (
            <Button onClick={() => onNext() && setStep(step + 1)}>Next</Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};
