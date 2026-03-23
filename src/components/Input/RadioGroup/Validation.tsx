import React from "react";
import { FieldProps, getIn } from "formik";
import { FormControlLabel, FormHelperText, Radio, RadioGroup, RadioGroupProps, Typography } from "@mui/material";

type GroupOptions = {
  id: number;
  name: string | number;
  description?: string;
};

type RadionGroupValidationProps = FieldProps &
  RadioGroupProps & {
    options: GroupOptions[];
  };

const RadioGroupValidation: React.FC<RadionGroupValidationProps> = React.memo((props) => {
  const { field, form, options } = props;

  const isTouched = getIn(form?.touched, field?.name);
  const errorMessage = getIn(form?.errors, field?.name);

  return (
    <>
      <RadioGroup {...field} {...props}>
        {options.map((data, index) => (
          <React.Fragment key={index}>
            <FormControlLabel
              control={<Radio size="small" />}
              label={
                <Typography fontSize="12px" fontWeight={500}>
                  {data.name}
                </Typography>
              }
              value={data.id}
            />
            {data.description && (
              <Typography fontSize="12px" sx={{ ml: 3.4 }}>
                {data.description}
              </Typography>
            )}
          </React.Fragment>
        ))}
      </RadioGroup>
      {errorMessage && isTouched && (
        <FormHelperText error sx={{ ml: 0, fontSize: "10px" }}>
          {errorMessage}
        </FormHelperText>
      )}
    </>
  );
});

RadioGroupValidation.displayName = "RadioGroupValidation";

export default RadioGroupValidation;
