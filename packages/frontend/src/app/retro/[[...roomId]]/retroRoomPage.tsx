"use client";

import { GlobalGetServerSideProps } from "../../../common/utils/globalGetServerSideProps";
import { ConfigurationContextProvider } from "../../../common/context/ConfigurationContext";
import { RoomContextProvider } from "../../../common/context/RoomContext";
import { UserContextProvider } from "../../../common/context/UserContext";
import { RetroContextProvider } from "../../../retro/context/RetroContext";
import { ExportRetroContextProvider } from "../../../retro/context/ExportRetroContext";
import { RetroPageContent } from "../../../retro/components/RetroPageContent";
import React from "react";

export default function RetroRoomPage({ configuration }: GlobalGetServerSideProps) {
  return (
    <ConfigurationContextProvider configuration={configuration}>
      <RoomContextProvider>
        <UserContextProvider>
          <RetroContextProvider>
            <ExportRetroContextProvider>
              <RetroPageContent />
            </ExportRetroContextProvider>
          </RetroContextProvider>
        </UserContextProvider>
      </RoomContextProvider>
    </ConfigurationContextProvider>
  );
}
