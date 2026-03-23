import React from "react";
import { TextFieldProps, useTheme } from "@mui/material";
import { DatePickerProps, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

// type DateDefaultProps = DatePickerProps<Dayjs> & TextFieldProps;

type DateDefaultProps = DatePickerProps<Dayjs> & {
  placeholder?: string;
};

const DateDefault: React.FC<DateDefaultProps> = React.memo((props) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        {...(props as DatePickerProps<Dayjs>)}
        format="YYYY-MM-DD"
        slotProps={{
          textField: {
            placeholder: props.placeholder,
            sx: {
              button: {
                margin: 0,
              },
            },
            inputProps: {
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
          // textField: {
          //   ...props,
          //   sx: {
          //     button: {
          //       margin: 0,
          //     },
          //   },
          //   inputProps: {
          //     ...props.inputProps,
          //     sx: {
          //       fontSize: "12px",
          //       fontWeight: "500",
          //       padding: "14px 5px",
          //       "&::placeholder": {
          //         fontWeight: "500",
          //         opacity: 1,
          //       },
          //     },
          //   },
          //   InputProps: {
          //     ...props.InputProps,
          //     sx: {
          //       background: "#36597D0A",
          //       backdropFilter: "blur(20px)",
          //       borderRadius: "12px",
          //       "&.MuiOutlinedInput-root": {
          //         "& fieldset": {
          //           border: `1px solid ${theme.palette.grey["200"]}`,
          //         },
          //         "&:hover fieldset": {
          //           border: `1px solid ${theme.palette.text.primary}`,
          //         },
          //         "&.Mui-focused fieldset": {
          //           border: `1px solid ${theme.palette.text.primary}}`,
          //         },
          //         "&.MuiInputBase-root": {
          //           paddingLeft: "10px",
          //           paddingRight: "10px",
          //         },
          //       },
          //       ".MuiInputAdornment-positionEnd": {
          //         ".MuiSvgIcon-root": {
          //           fill: `${theme.palette.text.primary} !important`,
          //           width: "20px",
          //           height: "20px",
          //         },
          //       },
          //     },
          //   },
          // },
          day: {
            sx: {
              ":not(.Mui-selected)": {
                borderColor: `#36597D !important`,
                transition: "none",
              },
              "&.Mui-selected": {
                color: theme.palette.common.white,
                background: `#36597D !important`,
              },
              ":hover": {
                color: theme.palette.common.white,
                background: `#36597D !important`,
              },
            },
          },
          desktopPaper: {
            sx: {
              background: theme.palette.common.white,
              borderRadius: "12px",
              boxShadow: theme.shadows[1],
              marginTop: "5px",
              "& .MuiPickersYear-yearButton": {
                fontSize: "12px",
                "&.Mui-selected": {
                  color: theme.palette.common.white,
                  background: `#36597D !important`,
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
});

DateDefault.displayName = "DateDefault";

export default DateDefault;
