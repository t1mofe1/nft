import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface IImageSelectorProps {
  maxSize?: number;
  onChange: (file: {
    name: string;
    size: number;
    data: string;
    extension: string;
  }) => void;
}

export const ImageSelector = ({ maxSize, onChange }: IImageSelectorProps) => {
  const inputId = (Math.random() + 1).toString(36).substring(7);

  return (
    <label htmlFor={inputId}>
      <input
        type="file"
        id={inputId}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) {
            return;
          }
          console.log(file);
          const reader = new FileReader();

          reader.onloadend = function () {
            const { name, size, type } = file;

            if (!reader.result) {
              return;
            }

            const [fileType, extension] = type.split("/");

            onChange({
              name,
              size,
              extension,
              data: reader.result.toString(),
            });
          };

          reader.readAsDataURL(file);
        }}
        multiple={false}
      />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <EditIcon htmlColor="white" />
      </IconButton>
    </label>
  );
};
