import React, { useState, useRef } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { Box } from "@mui/material";

const DropZone = () => {
  const [state, setState] = useState({ files: [] });
  const ref = useRef<HTMLDivElement>(null);
  const handleChange = (files: any) => {
    setState({ files: files });
  };
  return (
    <Box ref={ref}>
      <DropzoneArea
        acceptedFiles={["image/*", "video/*", "application/*"]}
        onChange={(files) => handleChange(files)}
        showFileNames
        dropzoneText="Arraste o arquivo aqui ou clique para selecionar"
        showAlerts={true}
        filesLimit={20}
      />
    </Box>
  );
};

export default DropZone;
