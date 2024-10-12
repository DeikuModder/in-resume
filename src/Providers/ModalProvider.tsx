import React, { useState } from "react";
import { ProviderParams } from "../type";

export const ModalContext = React.createContext(
  {} as ReturnType<typeof useModalController>
);

const useModalController = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return {
    isModalOpen,
    setIsModalOpen,
  };
};

const ModalProvider: React.FC<ProviderParams> = ({ children }) => {
  return (
    <ModalContext.Provider value={useModalController()}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
