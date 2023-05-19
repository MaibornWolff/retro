import { useEffect, useState } from "react";

import { useUserContext } from "../context/UserContext";
import { configuration } from "@shared/configuration";
import type Peer from "peerjs";
import { isClientSide } from "../utils/isClientSide";

const peerOptions = {
  host: configuration.signalingServerUrl.host,
  port: configuration.signalingServerUrl.port,
};

export function usePeer() {
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user.id || !isClientSide()) return;

    void import("peerjs").then(({ default: Peer }) => {
      const newPeer = new Peer(user.id, peerOptions);
      setPeer(newPeer);
    });
  }, [user.id]);

  return peer;
}
