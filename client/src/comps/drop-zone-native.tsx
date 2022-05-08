import React, { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface IDropzoneMUI {
  text: string;
  multiple?: boolean;
}

const DropzoneMUI = ({ text, multiple = false }: IDropzoneMUI) => {
  const ref = useRef<any>(null);
  const [files, setFiles] = useState<Array<File>>([]);

  return (
    <Dropzone
      ref={ref}
      onDrop={(acceptedFiles: Array<File>) => {
        setFiles(acceptedFiles);
      }}
    >
      {({
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
      }) => (
        <>
          <Paper
            elevation={0}
            sx={{
              borderStyle: "dashed",
              borderColor: isFocused ? "#000" : "#637381",
              borderWidth: "2px",
              backgroundColor: "#eee",
              py: 5,
            }}
          >
            <Stack direction="column" alignItems="center" {...getRootProps()}>
              <input {...getInputProps()} multiple={multiple} />
              <Typography variant="body2">{text}</Typography>
              <Icon sx={{ mt: 2 }}>{"code"}</Icon>
            </Stack>
          </Paper>
          <aside>
            <List dense={true}>
              {files &&
                files.map((file: File, i: number) => (
                  <ListItem
                    key={file.name}
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          setFiles(
                            files.filter((f: File) => f.name !== file.name)
                          );
                        }}
                      >
                        <Icon>{"delete"}</Icon>
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 600 }} variant="body2">
                          {file.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption">{`${file.size} bytes`}</Typography>
                      }
                    />
                  </ListItem>
                ))}
            </List>
          </aside>
        </>
      )}
    </Dropzone>
  );
};

export default DropzoneMUI;
