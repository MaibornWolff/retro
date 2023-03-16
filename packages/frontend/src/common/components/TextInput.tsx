import React, { KeyboardEvent } from "react";
import { TextField } from "@mui/material";
import { StandardTextFieldProps } from "@mui/material/TextField/TextField";
import { ErrorHelperText } from "./ErrorHelperText";

interface TextInputProps extends StandardTextFieldProps {
  onSubmit: () => void;
  errorHelperText?: string;
}

export function TextInput({ onSubmit, errorHelperText, ...props }: TextInputProps) {
  function handleSubmitOnEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <TextField
      {...props}
      onKeyDown={handleSubmitOnEnter}
      required={props.required}
      autoFocus={props.autoFocus}
      fullWidth={props.fullWidth ?? true}
      type={props.type ?? "text"}
      margin={props.margin ?? "dense"}
      autoComplete={props.autoComplete ?? "off"}
      helperText={<ErrorHelperText isError={props.error} message={errorHelperText} />}
    />
  );
}
