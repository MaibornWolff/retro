import { GetServerSideProps } from "next";
import { ApplicationConfiguration, getConfiguration } from "@shared/configuration";

export interface GlobalGetServerSideProps {
  configuration: ApplicationConfiguration;
}

export const globalGetServerSideProps: GetServerSideProps<{
  configuration: ApplicationConfiguration;
}> = async () => {
  const parsedConfiguration = JSON.parse(JSON.stringify(getConfiguration()));
  return { props: { configuration: parsedConfiguration } };
};
