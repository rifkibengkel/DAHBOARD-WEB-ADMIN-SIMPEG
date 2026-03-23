import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { TextFieldProps } from "@mui/material";
import { TextFieldDefault } from "../TextField";

type TextCurrencyDefaultProps = Omit<TextFieldProps, "handleChange"> & {
  handleChange: (e: NumberFormatProps) => void;
};

const TextCurrencyDefault: React.FC<TextCurrencyDefaultProps> = React.memo((props) => {
  const { handleChange } = props;

  return (
    <NumberFormat
      value={props.value as string}
      onValueChange={handleChange}
      placeholder={props.placeholder}
      customInput={TextFieldDefault}
      allowNegative={false}
      thousandSeparator
    />
  );
});

TextCurrencyDefault.displayName = "TextCurrencyDefault";

export default TextCurrencyDefault;
