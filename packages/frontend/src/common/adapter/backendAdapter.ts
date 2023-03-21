import { backendUrl } from "../hooks/usePeerToPeer";
import { RoomConfiguration } from "../../../../shared/types/types";

interface RoomIdExistsOptions {
  roomId?: string;
  namespace: string;
}

export async function getRoomConfiguration({
  roomId,
  namespace,
}: RoomIdExistsOptions): Promise<RoomConfiguration | undefined> {
  if (!roomId) return;
  const response = await fetch(backendUrl + `/${namespace}/rooms/${roomId}`);
  if (!response.ok) return;
  const body = await response.json().then((data) => data as RoomConfiguration);
  return body;
}
