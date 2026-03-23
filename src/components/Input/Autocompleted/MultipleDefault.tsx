import React from "react";
import { Autocomplete, Chip, Paper, PaperProps, TextField, TextFieldProps, useTheme } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

type AutoMultipleDefaultProps = TextFieldProps & {
  handleChange: (event: React.SyntheticEvent<Element, Event>, value: Options[]) => void;
  keys?: number;
  options: Options[];
  valueMultiple?: Options[];
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

const AutoMultipleDefault: React.FC<AutoMultipleDefaultProps> = React.memo((props) => {
  const { handleChange, keys, options, valueMultiple } = props;

  const theme = useTheme();

  return (
    <Autocomplete
      key={keys}
      multiple
      filterSelectedOptions
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      noOptionsText="Data Tidak Ditemukan"
      onChange={handleChange}
      value={valueMultiple}
      PaperComponent={CustomPaper}
      popupIcon={<KeyboardArrowDown />}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          // eslint-disable-next-line react/jsx-key
          <Chip
            variant="outlined"
            label={option.name}
            size="small"
            sx={{ fontSize: "12px", background: theme.palette.grey["200"] }}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
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
        />
      )}
    />
  );
});

AutoMultipleDefault.displayName = "AutoMultipleDefault";

export default AutoMultipleDefault;
