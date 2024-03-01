import { useContext } from "react";
import { InfoContext } from "./CVInfoProvider";

export const useInfoData = () => {
  return useContext(InfoContext);
};
