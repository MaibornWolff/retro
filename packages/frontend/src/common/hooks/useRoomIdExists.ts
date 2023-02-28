import { useEffect } from "react";
import { roomIdExists } from "../adapter/backendAdapter";
import { useRoomIdFromPath } from "./useRoomIdFromPath";
import { useErrorContext } from "../context/ErrorContext";
import { useNamespace } from "./useNamespace";

export function useRoomIdExists() {
  const { setIsError } = useErrorContext();
  const path = useNamespace();
  const roomIdFromPath = useRoomIdFromPath();

  useEffect(() => {
    if (!roomIdFromPath || !path) return;
    async function checkRoomIdExists() {
      const result = await roomIdExists({ roomId: roomIdFromPath, namespace: path });
      if (!result) {
        setIsError(true);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkRoomIdExists();
  }, [roomIdFromPath, path, setIsError]);
}
