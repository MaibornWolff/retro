import { useState } from "react";

export function useDialog(initialIsOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  function closeDialog() {
    setIsOpen(false);
  }

  function openDialog() {
    setIsOpen(true);
  }

  return {
    isOpen,
    closeDialog,
    openDialog,
  };
}
