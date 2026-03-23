import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

type GroupOptions = {
  id: number;
  name: string | number;
  description?: string;
  hideName?: boolean;
};

const CheckboxDefault: React.FC<GroupOptions> = React.memo((props) => {
  const { name, hideName } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: "red",
            "&.Mui-checked": {
              color: "red",
            },
          }}
        />
      }
      label={hideName ? null : name}
    />
  );
});

CheckboxDefault.displayName = "CheckboxDefault";

export default CheckboxDefault;
