import { useEffect } from "react";
import { getRoomConfiguration } from "../adapter/backendAdapter";
import { useRoomContext } from "../context/RoomContext";
import { useNamespace } from "./useNamespace";
import { useUserContext } from "../context/UserContext";

export function useFetchRoomConfigurationWhenModerator() {
  const { roomId, setIsAutoAcceptActivated } = useRoomContext();
  const namespace = useNamespace();
  const { user } = useUserContext();

  useEffect(() => {
    if (user.role === "moderator") {
      void (async () => {
        const roomConfig = await getRoomConfiguration({ roomId, namespace });
        if (roomConfig) {
          setIsAutoAcceptActivated(roomConfig?.isAutoAcceptActivated);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.role]);
}
