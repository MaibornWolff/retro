import React from "react";
import { UserContextProvider } from "../../common/context/UserContext";
import { ExportRetroContextProvider } from "../../retro/context/ExportRetroContext";
import { RoomContextProvider } from "../../common/context/RoomContext";
import { PokerPageContent } from "../../poker/components/PokerPageContent";
import { PokerContextProvider } from "../../poker/context/PokerContext";
import {
  GlobalGetServerSideProps,
  globalGetServerSideProps,
} from "../../common/utils/globalGetServerSideProps";
import { ConfigurationContextProvider } from "../../common/context/ConfigurationContext";

const PokerRoomPage = ({ configuration }: GlobalGetServerSideProps) => {
  return (
    <ConfigurationContextProvider configuration={configuration}>
      <RoomContextProvider>
        <UserContextProvider>
          <PokerContextProvider>
            <ExportRetroContextProvider>
              <PokerPageContent />
            </ExportRetroContextProvider>
          </PokerContextProvider>
        </UserContextProvider>
      </RoomContextProvider>
    </ConfigurationContextProvider>
  );
};

export const getServerSideProps = globalGetServerSideProps;

export default PokerRoomPage;
