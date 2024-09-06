import { BASEURL, PORT, PROTOCOL } from "~/constants/sodis";

export const buildEndpoint = () => {
  return `${PROTOCOL}://${BASEURL}${PORT == 80 || !PORT ? "" : ":" + PORT}/disp`;
};
