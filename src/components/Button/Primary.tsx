import React from "react";
import { Button, ButtonProps, useTheme } from "@mui/material";

const ButtonPrimary: React.FC<ButtonProps> = (props) => {
  const { children } = props;

  const theme = useTheme();

  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        color: theme.palette.common.white,
        textTransform: "capitalize",
        borderRadius: "12px",
        boxShadow: "none",
        background: "linear-gradient(257.35deg, #50CAFF 59.64%, #0478FF 100%)",
        py: 1.25,
        ":hover": {
          boxShadow: "none",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
