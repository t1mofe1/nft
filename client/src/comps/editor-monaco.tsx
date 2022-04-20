import MonacoEditor from "@monaco-editor/react";

interface IEditorProps {
  onChangeAssetCode: (value: string | undefined, event: any) => void;
  value: string;
  language?: string;
  theme?: string;
  width?: string;
  height: string;
}
export const Editor = ({
  onChangeAssetCode,
  value,
  height,
  width,
  language = "javascript",
  theme = "vs-dark",
}: IEditorProps) => {
  return (
    <MonacoEditor
      // options={options}
      height={height}
      width={width}
      onChange={onChangeAssetCode}
      theme={theme}
      language={language}
      defaultLanguage={language}
      value={value}
    />
  );
};
