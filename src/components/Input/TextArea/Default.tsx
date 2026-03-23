import React from "react";
import { TextField, TextFieldProps, useTheme } from "@mui/material";

const TextAreaDefault: React.FC<TextFieldProps> = React.memo((props) => {
  const { minRows, maxRows } = props;

  const theme = useTheme();

  return (
    <TextField
      {...props}
      multiline
      minRows={minRows ? minRows : 2}
      maxRows={maxRows ? maxRows : 2}
      inputProps={{
        ...props.inputProps,
        sx: {
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: "500",
          "&::placeholder": {
            fontWeight: "500",
            opacity: 1,
          },
          ...props.inputProps?.sx,
        },
      }}
      InputProps={{
        ...props.InputProps,
        sx: {
          background: "#36597D0A",
          backdropFilter: "blur(20px)",
          borderRadius: "12px",
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              border: `1px solid ${theme.palette.grey["200"]}`,
            },
            "&:hover fieldset": {
              border: `1px solid ${theme.palette.text.primary}`,
            },
            "&.Mui-focused fieldset": {
              border: `1px solid ${theme.palette.text.primary}`,
            },
            "&.MuiInputBase-root": {
              padding: "10px 15px",
            },
          },
          ".MuiInputAdornment-positionStart": {
            ".MuiSvgIcon-root": {
              fill: `${theme.palette.text.primary} !important`,
              width: "20px",
              height: "20px",
            },
          },
          ".MuiInputAdornment-positionEnd": {
            ".MuiSvgIcon-root": {
              fill: `${theme.palette.text.primary} !important`,
              width: "20px",
              height: "20px",
            },
          },
          ...props.InputProps?.sx,
        },
      }}
    />
  );
});

TextAreaDefault.displayName = "TextAreaDefault";

export default TextAreaDefault;
