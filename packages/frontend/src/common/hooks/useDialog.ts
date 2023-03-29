import { useCallback, useState } from "react";

export function useDialog(initialIsOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    closeDialog,
    openDialog,
  };
}
