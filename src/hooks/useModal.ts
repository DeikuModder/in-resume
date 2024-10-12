import useModalProvider from "../Providers/useModal";

const useModal = () => {
  const useModalController = useModalProvider();

  const { isModalOpen, setIsModalOpen } = useModalController;

  return {
    isModalOpen,
    setIsModalOpen,
  };
};

export default useModal;
