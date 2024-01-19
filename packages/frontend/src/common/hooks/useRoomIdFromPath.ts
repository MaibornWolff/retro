import { useParams } from "next/navigation";

export function useRoomIdFromPath() {
  const params = useParams();
  const roomId = params.roomId;
  return roomId?.[0];
}
