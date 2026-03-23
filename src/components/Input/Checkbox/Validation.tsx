import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const CheckboxValidation = React.memo(() => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox />} label="Label" />
    </FormGroup>
  );
});

CheckboxValidation.displayName = "CheckboxValidation";

export default CheckboxValidation;
