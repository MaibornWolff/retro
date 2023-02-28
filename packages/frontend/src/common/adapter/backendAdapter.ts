import { backendUrl } from "../hooks/usePeerToPeer";

interface RoomIdExistsOptions {
  roomId?: string;
  namespace: string;
}

export async function roomIdExists({ roomId, namespace }: RoomIdExistsOptions): Promise<boolean> {
  if (!roomId) return false;
  const response = await fetch(backendUrl + `/${namespace}/rooms/${roomId}`);
  return response.status === 200;
}
