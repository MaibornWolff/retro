import { GetServerSideProps } from "next";
import { ApplicationConfiguration, configuration } from "@shared/configuration";

export interface GlobalGetServerSideProps {
  configuration: ApplicationConfiguration;
}

export const globalGetServerSideProps: GetServerSideProps<{
  configuration: ApplicationConfiguration;
}> = async () => {
  const parsedConfiguration = JSON.parse(JSON.stringify(configuration));
  console.debug("Configuration", { configuration, env: process.env });
  return { props: { configuration: parsedConfiguration } };
};
