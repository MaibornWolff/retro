import type { NextApiRequest, NextApiResponse } from "next";
import { ApplicationConfiguration, getConfiguration } from "@shared/configuration";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ApplicationConfiguration>,
) {
  response.status(200).json(getConfiguration());
}
