import { Checkbox, DialogContentText, FormControlLabel } from "@mui/material";
import { TextInput } from "../../../common/components/TextInput";
import React from "react";

interface UserNameInputFieldProps {
  userName: string;
  label: string;
  onSubmit: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  storagePermissionLabel: string;
  isStorageAllowed: boolean;
  onStorageAllowanceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function UserNameInputField({
  userName,
  label,
  onSubmit,
  onChange,
  isError,
  isStorageAllowed,
  storagePermissionLabel,
  onStorageAllowanceChange,
}: UserNameInputFieldProps) {
  return (
    <>
      <DialogContentText>{label}</DialogContentText>
      <TextInput
        value={userName}
        onSubmit={onSubmit}
        onChange={onChange}
        error={isError}
        id="user-name"
        label="Username"
        autoFocus
      />
      <FormControlLabel
        control={<Checkbox checked={isStorageAllowed} onChange={onStorageAllowanceChange} />}
        label={storagePermissionLabel}
      />
    </>
  );
}
