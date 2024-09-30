import { BASEURL, PORT, PROTOCOL } from "~/constants/sodis";

export const buildEndpoint = () =>
  `${PROTOCOL}://${BASEURL}${PORT == 80 || !PORT ? "" : ":" + PORT}/disp`;

export const buildUrl = () =>
  `${PROTOCOL}://${BASEURL}${PORT == 80 || !PORT ? "" : ":" + PORT}`;
