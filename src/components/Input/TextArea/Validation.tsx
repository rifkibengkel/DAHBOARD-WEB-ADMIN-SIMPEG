import React from "react";
import { FieldProps, getIn } from "formik";
import { TextField, TextFieldProps, useTheme } from "@mui/material";

type TextAreaValidationProps = FieldProps & TextFieldProps;

const TextAreaValidation: React.FC<TextAreaValidationProps> = React.memo((props) => {
  const { error, helperText, field, form, minRows, maxRows } = props;

  const theme = useTheme();

  const isTouched = getIn(form?.touched, field?.name);
  const errorMessage = getIn(form?.errors, field?.name);

  return (
    <TextField
      {...field}
      {...props}
      multiline
      minRows={minRows ? minRows : 2}
      maxRows={maxRows ? maxRows : 2}
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? (isTouched && errorMessage)}
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
      FormHelperTextProps={{
        sx: { mt: 1, ml: 0, fontSize: "10px" },
      }}
    />
  );
});

TextAreaValidation.displayName = "TextAreaValidation";

export default TextAreaValidation;
