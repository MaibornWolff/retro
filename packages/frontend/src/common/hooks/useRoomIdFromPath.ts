import { useMatch } from "react-router-dom";
import { useNamespace } from "./useNamespace";

export function useRoomIdFromPath() {
  const path = useNamespace();
  const pattern = `/${path}/:roomId`;
  const match = useMatch(pattern);
  return match?.params.roomId;
}
