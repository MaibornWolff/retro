import React from "react";
import { UserContextProvider } from "../../common/context/UserContext";
import { RetroContextProvider } from "../../retro/context/RetroContext";
import { ExportRetroContextProvider } from "../../retro/context/ExportRetroContext";
import { RetroPageContent } from "../../retro/components/RetroPageContent";
import { RoomContextProvider } from "../../common/context/RoomContext";
import { GetServerSideProps } from "next";
import { resetServerContext } from "react-beautiful-dnd";

export default function RetroRoomPage() {
  return (
    <RoomContextProvider>
      <UserContextProvider>
        <RetroContextProvider>
          <ExportRetroContextProvider>
            <RetroPageContent />
          </ExportRetroContextProvider>
        </RetroContextProvider>
      </UserContextProvider>
    </RoomContextProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  resetServerContext();
  return { props: {} };
};
