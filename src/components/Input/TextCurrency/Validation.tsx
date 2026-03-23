import React from "react";
import NumberFormat from "react-number-format";
import { FieldProps } from "formik";
import { TextFieldValidation } from "../TextField";

const TextCurrencyValidation: React.FC<FieldProps> = React.memo((props) => {
  const { form, field } = props;

  return (
    <NumberFormat
      {...field}
      {...props}
      onValueChange={(e) => form.setFieldValue(field.name, e.value)}
      customInput={TextFieldValidation}
      allowNegative={false}
      thousandSeparator
    />
  );
});

TextCurrencyValidation.displayName = "TextCurrencyValidation";

export default TextCurrencyValidation;
