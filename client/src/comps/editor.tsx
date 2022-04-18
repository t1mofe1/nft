import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import { Box } from "@mui/material";

interface IJavaScriptEditorProps {
  onChangeAssetCode: (value: string) => void;
  value: string;
  width?: number;
  height: number;
}
export const JavascriptEditor = ({
  onChangeAssetCode,
  value,
  width,
  height,
}: IJavaScriptEditorProps) => {
  return (
    <Editor
      mode="javascript"
      onChangeAssetCode={onChangeAssetCode}
      value={value}
      width={width}
      height={height}
    />
  );
};

interface IEditorProps {
  mode: string;
  onChangeAssetCode: (value: string) => void;
  value: string;
  width?: number;
  height: number;
}
const Editor = ({
  mode,
  onChangeAssetCode,
  value,
  height,
  width,
}: IEditorProps) => {
  return (
    <Box sx={{ zIndex: 10000 }}>
      <AceEditor
        mode={mode}
        theme="monokai"
        name="Asset Code"
        fontSize={18}
        height={height + "px"}
        width={width + "px"}
        onChange={onChangeAssetCode}
        value={value}
        showPrintMargin={true}
        showGutter={true}
        tabSize={2}
        setOptions={{ useWorker: false }}
      />
    </Box>
  );
};
