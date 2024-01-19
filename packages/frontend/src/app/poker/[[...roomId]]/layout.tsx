import React, { PropsWithChildren } from "react";
import { ExportRetroContextProvider } from "../../../retro/context/ExportRetroContext";
import { PokerContextProvider } from "../../../poker/context/PokerContext";
import { RoomContextProvider } from "../../../common/context/RoomContext";
import { UserContextProvider } from "../../../common/context/UserContext";
import { ConfigurationContextProvider } from "../../../common/context/ConfigurationContext";
import { getConfiguration } from "@shared/configuration";

export default function Layout({ children }: PropsWithChildren) {
  const configuration = JSON.parse(JSON.stringify(getConfiguration()));
  return (
    <ConfigurationContextProvider configuration={configuration}>
      <RoomContextProvider>
        <UserContextProvider>
          <PokerContextProvider>
            <ExportRetroContextProvider>{children}</ExportRetroContextProvider>
          </PokerContextProvider>
        </UserContextProvider>
      </RoomContextProvider>
    </ConfigurationContextProvider>
  );
}
