import React from "react";
import SplitPane from "react-split";
import {
  Grid,
  Button,
  MenuItem,
  Container,
  TextField,
  Typography,
  FormControl,
  IconButton,
  Icon,
  Stack,
  Tooltip,
} from "@mui/material";
import Fade from "@mui/material/Fade";

import { Box } from "@mui/system";
import { AppCtx } from "../../app";
import { useState } from "../../helpers/state";
import { useAuth } from "../../comps/auth-context";
// import { JavascriptEditor } from "../../comps/editor";
import { Editor } from "../../comps/editor-monaco";
import { Stepper } from "../../comps/stepper";
import { textChangeRangeIsUnchanged } from "typescript";
import { SignInScreen } from "../sign-in";

const defaultAssetCodes: Array<{ name: string; value: string }> = [
  {
    name: "P5",
    value: `
    function setup() {
      createCanvas(400, 400);
    }
    
    function draw() {
      background(220);
    }`,
  },
  {
    name: "none",
    value: `var now = new Date();
        var ctx = document.getElementById('canvas').getContext('2d');`,
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
    library: "none",
    code: String(defaultAssetCodes.find((x) => x.name === "none")?.value),
  });

  const [outputValue, setOutputValue] = React.useState("");
  const [isNameEmpty, setNameEmpty] = React.useState(false);
  const [sizes, setSizes] = React.useState([55, 45]);
  const [editorWrapperWidth, setEditorWrapperWidth] = React.useState(0);
  const editorWrapper = React.useRef<HTMLDivElement>(null);

  const runCode = () => {
    let cdn: string,
      html: string = "";
    switch (library) {
      case "P5":
        cdn =
          '<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js" integrity="sha512-NxocnqsXP3zm0Xb42zqVMvjQIktKEpTIbCXXyhBPxqGZHqhcOXHs4pXI/GoZ8lE+2NJONRifuBpi9DxC58L0Lw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>';
        break;
      default:
        cdn = "";
        html = `<canvas id="canvas"></canvas>`;
    }
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
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
                    <script type="text/javascript" src="${url}"></script>
                    </body>
                  </html>`;
    setOutputValue(output);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (null !== editorWrapper.current) {
      setEditorWrapperWidth(editorWrapper.current.offsetWidth);
    }
  });
  if (!isLogged) return <SignInScreen referer={"/assets/create"} />;
  return (
    <Stepper
      onNext={() => {
        if (name === "") {
          setNameEmpty(true);
          return false;
        }
        return true;
      }}
      steps={[
        {
          label: "Info",
          component: (
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
                  onChange={(e) => {
                    const description = e.target.value;

                    updateState({
                      description,
                      code: defaultAssetCodes.find(
                        (x) => x.name === description
                      )?.value,
                    });
                  }}
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
                          (x) => x.name === newLibrary
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
          ),
        },
        {
          label: "Code",
          component: (
            <Box mt={2} p={2}>
              <Box my={2}>
                <Stack direction="row">
                  <Tooltip
                    title={"Run code"}
                    placement="top"
                    arrow
                    PopperProps={{
                      disablePortal: true,
                    }}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 200 }}
                  >
                    <IconButton onClick={runCode}>
                      <Icon sx={{ fontSize: "36px" }}>{"play_arrow"}</Icon>
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
              <SplitPane
                onDrag={(sizes: Array<number>) => setSizes(sizes)}
                sizes={sizes}
                className="split"
                expandToMin={true}
                gutterSize={15}
                gutterAlign="center"
              >
                <div style={{ width: `${sizes[0]}%` }} ref={editorWrapper}>
                  <Editor
                    value={code}
                    height="530px"
                    width={
                      editorWrapperWidth ? editorWrapperWidth + "px" : "100%"
                    }
                    onChangeAssetCode={(value, event) =>
                      updateState({ code: value })
                    }
                  />
                </div>
                <div style={{ width: `${sizes[1]}%` }}>
                  <iframe
                    title="Asset rendered"
                    srcDoc={outputValue}
                    style={{
                      border: 0,
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
              </SplitPane>
            </Box>
          ),
        },
        {
          label: "Finish",
          component: (
            <Box mt={2}>
              <Typography align="center" sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </Box>
          ),
        },
      ]}
    />
  );
};
