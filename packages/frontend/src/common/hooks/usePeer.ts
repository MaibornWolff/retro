import { useMemo } from "react";
import Peer from "peerjs";
import { useUserContext } from "../context/UserContext";
import { configuration } from "@shared/configuration";

const peerOptions = {
  host: configuration.signalingServerUrl.host,
  port: configuration.signalingServerUrl.port,
};

export function usePeer() {
  const { user } = useUserContext();

  return useMemo(() => {
    if (!user.id) return;

    return new Peer(user.id, peerOptions);
  }, [user.id]);
}
