import React from "react";
import { UserContextProvider } from "../../common/context/UserContext";
import { RetroContextProvider } from "../../retro/context/RetroContext";
import { ExportRetroContextProvider } from "../../retro/context/ExportRetroContext";
import { RetroPageContent } from "../../retro/components/RetroPageContent";
import { RoomContextProvider } from "../../common/context/RoomContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { resetServerContext } from "react-beautiful-dnd";

import {
  GlobalGetServerSideProps,
  globalGetServerSideProps,
} from "../../common/utils/globalGetServerSideProps";
import { ConfigurationContextProvider } from "../../common/context/ConfigurationContext";

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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  resetServerContext();
  const globalProps = await globalGetServerSideProps(context);
  return { ...globalProps };
};
