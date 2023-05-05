import { useRouter } from "next/router";

export function useRoomIdFromPath() {
  const router = useRouter();
  const { roomId } = router.query;
  return roomId;
}
