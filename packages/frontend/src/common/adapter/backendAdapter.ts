import { configuration } from "@shared/configuration";
import { RoomConfiguration } from "../../../../shared/types/types";

interface GetRoomConfigurationOptions {
  roomId?: string;
  namespace: string;
}
interface SetIsAutoAcceptActivatedOptions {
  roomId?: string;
  namespace: string;
  isActivated: boolean;
}

const backendUrl = configuration.backendUrl.url;

export async function getRoomConfiguration({
  roomId,
  namespace,
}: GetRoomConfigurationOptions): Promise<RoomConfiguration | undefined> {
  if (!roomId) return;
  const response = await fetch(`${backendUrl}/${namespace}/rooms/${roomId}`);
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
