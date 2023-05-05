import { useEffect, useRef } from "react";

import { useUserContext } from "../context/UserContext";
import { configuration } from "@shared/configuration";
import type Peer from "peerjs";
import { isClientSide } from "../utils/isClientSide";

const peerOptions = {
  host: configuration.signalingServerUrl.host,
  port: configuration.signalingServerUrl.port,
};

export function usePeer() {
  const peer = useRef<Peer>();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user.id || !isClientSide()) return;

    void import("peerjs").then(({ default: Peer }) => {
      peer.current = new Peer(user.id, peerOptions);
    });
  }, [user.id]);

  return peer.current;
}
