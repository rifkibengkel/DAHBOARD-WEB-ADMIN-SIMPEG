import React from "react";
import { FieldProps, getIn } from "formik";
import { Autocomplete, Paper, PaperProps, TextField, TextFieldProps, useTheme } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

type AutoValidationProps = FieldProps &
  TextFieldProps & {
    options: Options[];
  };

const CustomPaper = (props: PaperProps) => {
  const theme = useTheme();

  return (
    <Paper
      {...props}
      style={{
        fontSize: "12px",
        fontWeight: 500,
      }}
      sx={{
        marginTop: "5px",
        maxHeight: 300,
        background: "#36597D0A",
        backdropFilter: "blur(20px)",
        borderRadius: "12px",
        boxShadow: theme.shadows[1],
        "& .MuiAutocomplete-listbox": {
          padding: 0,
          "& .MuiAutocomplete-option[aria-selected='true']": {
            fontSize: "12px",
            color: theme.palette.common.white,
            background: theme.palette.primary.main,
            "&.Mui-focused": {
              background: theme.palette.primary.main,
            },
          },
        },
      }}
    />
  );
};

const AutoValidation: React.FC<AutoValidationProps> = React.memo((props) => {
  const { error, helperText, field, form, options } = props;

  const theme = useTheme();

  const isTouched = getIn(form.touched, field.name);
  const errorMessage = getIn(form.errors, field.name);

  const uncontrolledValue = options.find((opt) => opt.id === field.value) || undefined;

  return (
    <Autocomplete
      key={uncontrolledValue?.id}
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      noOptionsText="Data Tidak Ditemukan"
      onChange={(event, value) => form.setFieldValue(field.name, value.id)}
      defaultValue={uncontrolledValue}
      PaperComponent={CustomPaper}
      popupIcon={<KeyboardArrowDown />}
      disableClearable
      renderInput={(params) => (
        <TextField
          {...field}
          {...params}
          error={error ?? Boolean(isTouched && errorMessage)}
          helperText={helperText ?? (isTouched && errorMessage)}
          placeholder={props.placeholder}
          sx={{
            "& .MuiInputBase-input": {
              "&::placeholder": {
                fontWeight: "500",
                opacity: 1,
              },
            },
            "& .MuiOutlinedInput-root": {
              fontSize: "12px",
              fontWeight: 500,
              background: theme.palette.grey["100"],
              borderRadius: "12px",
              padding: "6.5px 0px",
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
            "& .MuiButtonBase-root": {
              position: "relative",
              top: "0px",
              right: "8px",
            },
            ".MuiSvgIcon-root": {
              fill: `${theme.palette.text.primary} !important`,
              width: "20px",
              height: "20px",
            },
          }}
          FormHelperTextProps={{
            sx: { mt: 1, ml: 0, fontSize: "10px" },
          }}
        />
      )}
    />
  );
});

AutoValidation.displayName = "AutoValidation";

export default AutoValidation;
