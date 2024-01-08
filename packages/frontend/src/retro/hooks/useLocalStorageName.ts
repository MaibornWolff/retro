import { useLocalStorage } from "../../common/hooks/useLocalStorage";
import { useState } from "react";
import { LocalStorage } from "../../common/utils/localStorage";

interface useLocalStorageNameProps {
  setName: (name: string) => void;
}
export default function useLocalStorageName({ setName }: useLocalStorageNameProps) {
  const [isStorageAllowed, setIsStorageAllowed] = useState(false);

  useLocalStorage(() => {
    setName(LocalStorage.getUserName());
    setIsStorageAllowed(LocalStorage.getNameStorePermission());
  });

  function saveNameLocally(name: string) {
    if (isStorageAllowed) {
      LocalStorage.setUserName(name);
    }
  }

  function handleAllowanceChange(isAllowed: boolean) {
    if (!isAllowed) {
      LocalStorage.removeUserName();
    }
    LocalStorage.setNameStorePermission(isAllowed);
    setIsStorageAllowed(isAllowed);
  }

  return { isStorageAllowed, saveNameLocally, handleAllowanceChange };
}
