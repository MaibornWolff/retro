import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { resetServerContext } from "react-beautiful-dnd";
import {
  GlobalGetServerSideProps,
  globalGetServerSideProps,
} from "../../../common/utils/globalGetServerSideProps";
import RetroRoomPage from "./retroRoomPage";

/*export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  resetServerContext();
  const globalProps = await globalGetServerSideProps(context);
  return { ...globalProps };
};*/

function getConfiguration() {
  resetServerContext();
  const globalProps = await globalGetServerSideProps(context);
  return { ...globalProps };
}

export default async function Page() {
  return <RetroRoomPage configuration={getConfiguration()} />;
}
