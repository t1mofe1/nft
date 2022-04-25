import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
interface IScriptProps {
  url?: string;
  script?: string;
  async?: boolean;
  head?: boolean;
  defer?: boolean;
  id?: string;
}
export const Script = ({
  url = "",
  script = "",
  head = false,
  id = "Script_" + Math.floor(Math.random() * 10),
  async = false,
  defer = false,
}: IScriptProps) => {
  const scriptWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scriptTag = document.createElement("script");
    const currentWrapper = scriptWrapper;

    if (url) scriptTag.src = url;
    else
      scriptTag.src = URL.createObjectURL(
        new Blob([script], { type: "text/javascript" })
      );

    if (defer) scriptTag.defer = true;
    if (async) scriptTag.async = true;
    if (head) document.head.appendChild(scriptTag);
    else scriptWrapper.current?.appendChild(scriptTag);

    return () => {
      if (head) document.head.removeChild(scriptTag);
      else currentWrapper.current?.removeChild(scriptTag);
    };
  }, [url, script, async, scriptWrapper, head, defer]);
  if (head) return null;
  return <Box id={id} component="div" ref={scriptWrapper} />;
};
