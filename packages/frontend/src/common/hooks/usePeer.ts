import { useEffect, useState } from "react";

import { useUserContext } from "../context/UserContext";
import type Peer from "peerjs";
import { isClientSide } from "../utils/isClientSide";
import { useConfigurationContext } from "../context/ConfigurationContext";

export function usePeer() {
  const { signalingServerUrl, iceServerUrls } = useConfigurationContext();
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const { user } = useUserContext();

  const peerOptions = {
    host: signalingServerUrl.host,
    port: signalingServerUrl.port,
    config: {
      iceServers: iceServerUrls,
    },
  };

  useEffect(() => {
    if (!user.id || !isClientSide()) return;

    void import("peerjs").then(({ default: Peer }) => {
      const newPeer = new Peer(user.id, peerOptions);
      setPeer(newPeer);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return peer;
}
