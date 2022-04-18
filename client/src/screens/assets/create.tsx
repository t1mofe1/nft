import React from "react";
import SplitPane from "react-split";
import {
  Grid,
  Step,
  Button,
  Stepper,
  MenuItem,
  Container,
  TextField,
  StepButton,
  Typography,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import { AppCtx } from "../../app";
import { useState } from "../../helpers/state";
import { useAuth } from "../../comps/auth-context";
import { JavascriptEditor } from "../../comps/editor";

const steps = ["Information", "Asset's Code"];

const defaultAssetCodes: Array<{ name: string; value: string }> = [
  {
    name: "P5",
    value: `let cx, cy;
        let secondsRadius;
        let minutesRadius;
        let hoursRadius;
        let clockDiameter;
        
        function setup() {
          createCanvas(720, 400);
          stroke(255);
        
          let radius = min(width, height) / 2;
          secondsRadius = radius * 0.71;
          minutesRadius = radius * 0.6;
          hoursRadius = radius * 0.5;
          clockDiameter = radius * 1.7;
        
          cx = width / 2;
          cy = height / 2;
        }
        
        function draw() {
          background(230);
        
          // Draw the clock background
          noStroke();
          fill(244, 122, 158);
          ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
          fill(237, 34, 93);
          ellipse(cx, cy, clockDiameter, clockDiameter);
        
          // Angles for sin() and cos() start at 3 o'clock;
          // subtract HALF_PI to make them start at the top
          let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
          let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
          let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
        
          // Draw the hands of the clock
          stroke(255);
          strokeWeight(1);
          line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
          strokeWeight(2);
          line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
          strokeWeight(4);
          line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
        
          // Draw the minute ticks
          strokeWeight(2);
          beginShape(POINTS);
          for (let a = 0; a < 360; a += 6) {
            let angle = radians(a);
            let x = cx + cos(angle) * secondsRadius;
            let y = cy + sin(angle) * secondsRadius;
            vertex(x, y);
          }
          endShape();
        }`,
  },
  {
    name: "none",
    value: `function clock() {
        var now = new Date();
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.save();
        ctx.clearRect(0, 0, 150, 150);
        ctx.translate(75, 75);
        ctx.scale(0.4, 0.4);
        ctx.rotate(-Math.PI / 2);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
      
        // Hour marks
        ctx.save();
        for (var i = 0; i < 12; i++) {
          ctx.beginPath();
          ctx.rotate(Math.PI / 6);
          ctx.moveTo(100, 0);
          ctx.lineTo(120, 0);
          ctx.stroke();
        }
        ctx.restore();
      
        // Minute marks
        ctx.save();
        ctx.lineWidth = 5;
        for (i = 0; i < 60; i++) {
          if (i % 5!= 0) {
            ctx.beginPath();
            ctx.moveTo(117, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
          }
          ctx.rotate(Math.PI / 30);
        }
        ctx.restore();
      
        var sec = now.getSeconds();
        var min = now.getMinutes();
        var hr  = now.getHours();
        hr = hr >= 12 ? hr - 12 : hr;
      
        ctx.fillStyle = 'black';
      
        // write Hours
        ctx.save();
        ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) *sec);
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(80, 0);
        ctx.stroke();
        ctx.restore();
      
        // write Minutes
        ctx.save();
        ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-28, 0);
        ctx.lineTo(112, 0);
        ctx.stroke();
        ctx.restore();
      
        // Write seconds
        ctx.save();
        ctx.rotate(sec * Math.PI / 30);
        ctx.strokeStyle = '#D40000';
        ctx.fillStyle = '#D40000';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(83, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();
      
        ctx.beginPath();
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#325FA2';
        ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
        ctx.stroke();
      
        ctx.restore();
      
        window.requestAnimationFrame(clock);
      }
      
      window.requestAnimationFrame(clock);`,
  },
];

export const CreateAssetScreen = () => {
  const { isLogged } = useAuth();
  const dataContext = React.useContext(AppCtx);

  const {
    state: { name, description, category, library, code },
    updateState,
  } = useState({
    name: "",
    description: "",
    category: "",
    library: "",
    code: "",
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [isNameEmpty, setNameEmpty] = React.useState(false);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    //validation
    if (name === "") {
      setNameEmpty(true);
      return;
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [outputValue, setOutputValue] = React.useState("");

  React.useEffect(() => {
    let cdn: string,
      html: string = "";
    switch (library) {
      case "P5":
        cdn =
          '<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js" integrity="sha512-NxocnqsXP3zm0Xb42zqVMvjQIktKEpTIbCXXyhBPxqGZHqhcOXHs4pXI/GoZ8lE+2NJONRifuBpi9DxC58L0Lw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>';

        break;
      default:
        cdn = "";
        html = `<canvas id="canvas" />`;
    }

    const output = `<html>
                    <head>
                    <style>
                        ::-webkit-scrollbar {
                            width: 8px;
                            height:8px;
                        }
                        ::-webkit-scrollbar-track {
                            background: #f1f1f1; 
                        }
                        ::-webkit-scrollbar-thumb {
                            background: #888; 
                        }
                        ::-webkit-scrollbar-thumb:hover {
                            background: #555; 
                        }
                    </style>
                        ${cdn}
                    </head>
                    <body style="margin:0;">
                        ${html}
                    <script type="text/javascript">
                        ${code}
                    </script>
                    </body>
                  </html>`;
    setOutputValue(output);
  }, [code, library]);

  if (!isLogged)
    return (
      <Container>
        <Grid item xs={12} sx={{ py: 2 }}>
          here we need to add the link for wallet
        </Grid>
      </Container>
    );

  return (
    <React.Fragment>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Container>
      {activeStep === steps.length && (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      )}
      {activeStep === 0 && (
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <FormControl fullWidth margin="dense">
            <TextField
              required
              fullWidth
              value={name}
              variant="outlined"
              label="Name"
              error={isNameEmpty}
              onChange={(e) => {
                setNameEmpty(e.target.value === "");
                updateState({ name: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <TextField
              select
              variant="outlined"
              value={category}
              onChange={(e) => updateState({ category: e.target.value })}
              fullWidth
              label="Category"
            >
              {dataContext?.nftFilterProps.categories.map((category, i) => {
                return (
                  <MenuItem key={category.key} value={category.name}>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </MenuItem>
                );
              })}
            </TextField>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <TextField
              fullWidth
              multiline
              value={description}
              minRows={5}
              onChange={(e) => updateState({ category: e.target.value })}
              maxRows="Infinity"
              variant="outlined"
              label="Description"
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <TextField
              fullWidth
              select
              variant="outlined"
              value={library}
              onChange={(e) => {
                const newLibrary = e.target.value;

                if (library !== newLibrary) {
                  updateState({
                    library: newLibrary,
                    code: defaultAssetCodes.filter(
                      (code) => code.name === newLibrary
                    )[0].value,
                  });
                }
              }}
              label="Library"
            >
              <MenuItem key={0} value="none">
                None
              </MenuItem>
              {dataContext?.nftFilterProps.libraries.map((library, i) => {
                return (
                  <MenuItem key={i} value={library.name}>
                    {library.name.charAt(0).toUpperCase() +
                      library.name.slice(1)}
                  </MenuItem>
                );
              })}
            </TextField>
          </FormControl>
        </Container>
      )}
      {activeStep === 1 && (
        <Box p={2}>
          <SplitPane
            sizes={[50, 45]}
            className="split"
            expandToMin={true}
            gutterSize={15}
            gutterAlign="center"
          >
            <div>
              <JavascriptEditor
                value={code}
                height={530}
                onChangeAssetCode={(value) => updateState({ code: value })}
              />
            </div>
            <div>
              <iframe
                title="Asset rendered"
                srcDoc={outputValue}
                style={{
                  border: 0,
                  height: 530,
                }}
              />
            </div>
          </SplitPane>
        </Box>
      )}
      {activeStep < steps.length && (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Container>
      )}
    </React.Fragment>
  );
};
