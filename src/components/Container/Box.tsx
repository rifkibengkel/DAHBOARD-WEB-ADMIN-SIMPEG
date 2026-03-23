import React from "react";
import { Stack, StackProps, useTheme } from "@mui/material";

const ContainerPaper: React.FC<StackProps> = (props) => {
  const { children } = props;

  const theme = useTheme();

  return (
    <Stack
      {...props}
      sx={{
        background: theme.palette.background.paper,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.grey["200"]}`,
        boxShadow: theme.shadows[1],
        backdropFilter: "blur(20px)",
        ...props.sx,
      }}
    >
      {children}
    </Stack>
  );
};

export default ContainerPaper;
