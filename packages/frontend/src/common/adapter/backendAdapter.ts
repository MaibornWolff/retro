import axios from "axios";
import { useConfigurationContext } from "../context/ConfigurationContext";

interface RoomIdExistsOptions {
  roomId?: string;
  namespace: string;
}

export function useBackendAdapter() {
  const backendUrl = useConfigurationContext().backendUrl.url;

  async function roomIdExists({ roomId, namespace }: RoomIdExistsOptions): Promise<boolean> {
    if (!roomId) return false;
    const response = await axios.get(`${backendUrl}/${namespace}/rooms/${roomId}`);
    return response.status === 200;
  }

  return {
    roomIdExists,
  };
}
