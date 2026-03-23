import React from "react";
import { Dayjs } from "dayjs";
import { FieldProps, getIn } from "formik";
import { TextFieldProps, useTheme } from "@mui/material";
import { TimeFieldProps, TimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type TimeValidationProps = FieldProps & TextFieldProps;

const TimeValidation: React.FC<TimeValidationProps> = React.memo((props) => {
  const { error, helperText, field, form } = props;

  const theme = useTheme();

  const isTouched = getIn(form?.touched, field?.name);
  const errorMessage = getIn(form?.errors, field?.name);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
        {...(props as TimeFieldProps<Dayjs>)}
        format="HH:mm:ss"
        onChange={(value) => form.setFieldValue(field.name, value)}
        slotProps={{
          textField: {
            ...props,
            error: error ?? Boolean(isTouched && errorMessage),
            helperText: helperText ?? (isTouched && errorMessage),
            sx: {
              button: {
                margin: 0,
              },
            },
            inputProps: {
              ...props.inputProps,
              sx: {
                fontSize: "12px",
                fontWeight: "500",
                padding: "14px 5px",
                "&::placeholder": {
                  fontWeight: "500",
                  opacity: 1,
                },
              },
            },
            InputProps: {
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
                ".MuiInputAdornment-positionEnd": {
                  ".MuiSvgIcon-root": {
                    fill: `${theme.palette.text.primary} !important`,
                    width: "20px",
                    height: "20px",
                  },
                },
              },
            },
            FormHelperTextProps: {
              sx: { mt: 1, ml: 0, fontSize: "10px" },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
});

TimeValidation.displayName = "TimeValidation";

export default TimeValidation;
