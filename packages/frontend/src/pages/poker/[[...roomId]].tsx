import React from "react";
import { UserContextProvider } from "../../common/context/UserContext";
import { ExportRetroContextProvider } from "../../retro/context/ExportRetroContext";
import { RoomContextProvider } from "../../common/context/RoomContext";
import { PokerPageContent } from "../../poker/components/PokerPageContent";
import { PokerContextProvider } from "../../poker/context/PokerContext";

const PokerRoomPage = () => {
  return (
    <RoomContextProvider>
      <UserContextProvider>
        <PokerContextProvider>
          <ExportRetroContextProvider>
            <PokerPageContent />
          </ExportRetroContextProvider>
        </PokerContextProvider>
      </UserContextProvider>
    </RoomContextProvider>
  );
};

export default PokerRoomPage;
