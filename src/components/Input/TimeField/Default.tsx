import React from "react";
import { TextFieldProps, useTheme } from "@mui/material";
import { TimeFieldProps, TimeField, LocalizationProvider, TimePickerProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

type TimeDefaultProps = TimePickerProps<Dayjs> & TextFieldProps;

const TimeDefault: React.FC<TimeDefaultProps> = React.memo((props) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
        {...(props as TimeFieldProps<Dayjs>)}
        format="YYYY-MM-DD"
        slotProps={{
          textField: {
            ...props,
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
          },
        }}
      />
    </LocalizationProvider>
  );
});

TimeDefault.displayName = "TimeDefault";

export default TimeDefault;
