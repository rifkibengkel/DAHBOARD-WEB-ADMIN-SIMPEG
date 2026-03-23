import React from "react";
import { Button, ButtonProps, useTheme } from "@mui/material";

const ButtonSecondary: React.FC<ButtonProps> = (props) => {
  const { children } = props;

  const theme = useTheme();

  return (
    <Button
      {...props}
      variant="outlined"
      sx={{
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
        textTransform: "capitalize",
        borderRadius: "12px",
        boxShadow: "none",
        py: 1.25,
        ":hover": {
          color: theme.palette.common.white,
          borderColor: theme.palette.text.primary,
          background: theme.palette.text.primary,
          boxShadow: "none",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonSecondary;
