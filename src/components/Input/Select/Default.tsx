import React from "react";
import { MenuItem, TextField, TextFieldProps, useTheme } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

type SelectDefaultProps = TextFieldProps & {
  options: Options[];
};

const SelectDefault: React.FC<SelectDefaultProps> = React.memo((props) => {
  const { placeholder, options } = props;

  const theme = useTheme();

  return (
    <TextField
      {...props}
      select
      SelectProps={{
        displayEmpty: true,
        renderValue: (value) => {
          return options.find((opt) => opt.id === value)?.name ?? placeholder;
        },
        IconComponent: KeyboardArrowDown,
        sx: {
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: "500",
          borderRadius: "12px",
          background: "#36597D0A",
          backdropFilter: "blur(20px)",
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
          },
          ".MuiSelect-icon": {
            fill: `${theme.palette.text.primary} !important`,
            width: "20px",
            height: "20px",
            margin: "2px 11px 0px 0px",
          },
          ".MuiSelect-select": {
            padding: "14px 15px",
          },
        },
        MenuProps: {
          disableScrollLock: true,
          disableAutoFocusItem: true,
          slotProps: {
            paper: {
              sx: {
                maxHeight: 300,
                background: theme.palette.common.white,
                borderRadius: "12px",
                boxShadow: theme.shadows[1],
              },
            },
          },
          MenuListProps: {
            disablePadding: true,
          },
          style: {
            marginTop: "5px",
          },
        },
      }}
    >
      {options.length === 0 && (
        <MenuItem
          value=""
          sx={{
            fontSize: "12px",
            fontWeight: 500,
            py: 2.06299,
            "&.Mui-selected": {
              fontSize: "12px",
              color: theme.palette.text.secondary,
              background: "none",
            },
            "&.Mui-selected:focus": {
              background: "none",
            },
            "&.Mui-selected:hover": {
              background: "none",
            },
          }}
        >
          Data Tidak Ditemukan
        </MenuItem>
      )}
      {options.map((opt, index) => (
        <MenuItem
          key={index}
          value={opt.id}
          sx={{
            fontSize: "12px",
            fontWeight: 500,
            "&.Mui-selected": {
              fontSize: "12px",
              color: theme.palette.common.white,
              background: theme.palette.text.primary,
            },
            "&.Mui-selected:focus": {
              background: theme.palette.text.primary,
            },
            "&.Mui-selected:hover": {
              background: theme.palette.text.primary,
            },
          }}
        >
          {opt.name}
        </MenuItem>
      ))}
    </TextField>
  );
});

SelectDefault.displayName = "SelectDefault";

export default SelectDefault;
