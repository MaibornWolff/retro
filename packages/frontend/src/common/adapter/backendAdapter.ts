import { configuration } from "@shared/configuration";

interface RoomIdExistsOptions {
  roomId?: string;
  namespace: string;
}

export async function roomIdExists({ roomId, namespace }: RoomIdExistsOptions): Promise<boolean> {
  if (!roomId) return false;
  const response = await fetch(`${configuration.backendUrl.url}/${namespace}/rooms/${roomId}`);
  return response.status === 200;
}
