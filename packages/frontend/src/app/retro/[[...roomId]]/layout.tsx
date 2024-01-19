import React, { PropsWithChildren } from "react";
import { getConfiguration } from "@shared/configuration";
import { ConfigurationContextProvider } from "../../../common/context/ConfigurationContext";
import { RoomContextProvider } from "../../../common/context/RoomContext";
import { UserContextProvider } from "../../../common/context/UserContext";
import { RetroContextProvider } from "../../../retro/context/RetroContext";
import { ExportRetroContextProvider } from "../../../retro/context/ExportRetroContext";

export default function Layout({ children }: PropsWithChildren) {
  const configuration = JSON.parse(JSON.stringify(getConfiguration()));
  return (
    <ConfigurationContextProvider configuration={configuration}>
      <RoomContextProvider>
        <UserContextProvider>
          <RetroContextProvider>
            <ExportRetroContextProvider>{children}</ExportRetroContextProvider>
          </RetroContextProvider>
        </UserContextProvider>
      </RoomContextProvider>
    </ConfigurationContextProvider>
  );
}
