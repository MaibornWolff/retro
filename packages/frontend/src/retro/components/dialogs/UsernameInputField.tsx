import { Checkbox, DialogContentText, FormControlLabel, IconButton, Tooltip } from "@mui/material";
import { TextInput, TextInputProps } from "../../../common/components/TextInput";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";

interface UserNameInputFieldProps extends TextInputProps {
  userName: string;
  label?: string;
  textFieldLabel?: string;
  storagePermissionLabel?: string;
  isStorageAllowed: boolean;
  onStorageAllowanceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserNameInputField({
  userName,
  label = "Please enter your name",
  storagePermissionLabel = "Remember me",
  textFieldLabel = "Username",
  id,
  onSubmit,
  onChange,
  error,
  isStorageAllowed,
  onStorageAllowanceChange,
  ...props
}: UserNameInputFieldProps) {
  return (
    <>
      <DialogContentText>{label}</DialogContentText>
      <TextInput
        value={userName}
        onSubmit={onSubmit}
        onChange={onChange}
        error={error}
        label={textFieldLabel}
        {...props}
      />

      <FormControlLabel
        control={<Checkbox checked={isStorageAllowed} onChange={onStorageAllowanceChange} />}
        label={storagePermissionLabel}
        sx={{ marginRight: 0 }}
      />
      <Tooltip
        arrow
        title="If checked, the username will be persisted in the local storage of your browser for future sessions. Unchecking the box will remove this information from your browser again. Your username will only be shared while collaborating and will not be persisted on any server or transmitted to any external service."
      >
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
