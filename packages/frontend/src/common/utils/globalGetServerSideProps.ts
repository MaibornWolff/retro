import { GetServerSideProps } from "next";
import { ApplicationConfiguration, configuration } from "@shared/configuration";

export interface GlobalGetServerSideProps {
  configuration: ApplicationConfiguration;
}

export const globalGetServerSideProps: GetServerSideProps<{
  configuration: ApplicationConfiguration;
}> = async () => {
  const parsedConfiguration = JSON.parse(JSON.stringify(configuration));
  return { props: { configuration: parsedConfiguration } };
};
