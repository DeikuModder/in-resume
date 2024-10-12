import { useContext } from "react";
import { ModalContext } from "./ModalProvider";

const useModalProvider = () => {
  return useContext(ModalContext);
};

export default useModalProvider;
