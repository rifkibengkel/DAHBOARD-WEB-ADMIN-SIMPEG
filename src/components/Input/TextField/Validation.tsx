import React from "react";
import { FieldProps, getIn } from "formik";
import { TextField, TextFieldProps, useTheme } from "@mui/material";

type TextFieldValidationProps = FieldProps & TextFieldProps;

const TextFieldValidation: React.FC<TextFieldValidationProps> = React.memo((props) => {
  const { error, helperText, field, form } = props;

  const theme = useTheme();

  const isTouched = getIn(form?.touched, field?.name);
  const errorMessage = getIn(form?.errors, field?.name);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && props.inputMode === "numeric" && e.key !== "Enter") {
      e.preventDefault();
    }
  };

  return (
    <TextField
      {...field}
      {...props}
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? (isTouched && errorMessage)}
      inputProps={{
        ...props.inputProps,
        inputMode: props.inputMode === "numeric" ? "numeric" : "text",
        onKeyPress: handleKeyPress,
        sx: {
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: "500",
          padding: "14px 5px",
          "&::placeholder": {
            fontWeight: "500",
            opacity: 1,
          },
          "&[type=number]": {
            MozAppearance: "textfield",
          },
          "&::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "&::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
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
              paddingLeft: "10px",
              paddingRight: "10px",
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
      FormHelperTextProps={{
        sx: { mt: 1, ml: 0, fontSize: "10px" },
      }}
    />
  );
});

TextFieldValidation.displayName = "TextFieldValidation";

export default TextFieldValidation;
