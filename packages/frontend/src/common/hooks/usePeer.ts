import { useMemo } from "react";
import Peer from "peerjs";
import { useUserContext } from "../context/UserContext";

const peerOptions = {
  host: "localhost",
  port: 3002,
};

export function usePeer() {
  const { user } = useUserContext();

  return useMemo(() => {
    if (!user.id) return;

    return new Peer(user.id, peerOptions);
  }, [user.id]);
}
