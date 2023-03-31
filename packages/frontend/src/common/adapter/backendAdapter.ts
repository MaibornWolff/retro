import { backendUrl } from "../hooks/usePeerToPeer";
import { RoomConfiguration } from "../../../../shared/types/types";

interface GetRoomConfigrationOptions {
  roomId?: string;
  namespace: string;
}
interface SetIsAutoAcceptActivatedOptions {
  roomId?: string;
  namespace: string;
  isActivated: boolean;
}

export async function getRoomConfiguration({
  roomId,
  namespace,
}: GetRoomConfigrationOptions): Promise<RoomConfiguration | undefined> {
  if (!roomId) return;
  const response = await fetch(backendUrl + `/${namespace}/rooms/${roomId}`);
  if (!response.ok) return;
  return await Promise.resolve(response.json());
}

export async function putIsAutoAcceptActivated({
  roomId,
  namespace,
  isActivated,
}: SetIsAutoAcceptActivatedOptions) {
  if (!roomId) return false;
  const url = `${backendUrl}/${namespace}/rooms/${roomId}/is-auto-accept-activated`;
  await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActivated }),
  });
}
