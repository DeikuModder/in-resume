import useModal from "../hooks/useModal";
import ModalProvider from "../Providers/ModalProvider";
import CLOSE_BTN from "./CLOSE_BTN";

const CONTENT = ({
  children,
  onClose,
  width,
  height,
  title,
}: {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  width: string;
  height: string;
  title?: string;
}) => {
  return (
    <div className="modal">
      <div className="flex items-center text-black text-base bg-slate-300">
        <p className="w-[90%] px-2 font-semibold">{title}</p>
        <div className="w-[10%]">
          <CLOSE_BTN onClose={onClose} />
        </div>
      </div>
      <div className={`bg-white ${width} ${height} overflow-auto`}>
        {children}
      </div>
    </div>
  );
};

const MODAL_WINDOW = ({
  children,
  buttonContent,
  width,
  height,
  buttonStyle,
  title,
  windowStyle,
  onClick,
}: {
  children: JSX.Element | JSX.Element[];
  buttonContent: JSX.Element | JSX.Element[] | string;
  width: string;
  height: string;
  buttonStyle?: string;
  title?: string;
  windowStyle?: string;
  onClick?: () => void;
}) => {
  const { isModalOpen, setIsModalOpen } = useModal();

  return (
    <>
      {isModalOpen && (
        <div className={windowStyle}>
          <CONTENT
            onClose={() => setIsModalOpen(false)}
            title={title}
            width={width}
            height={height}
          >
            {children}
          </CONTENT>
        </div>
      )}
      <button
        onClick={() => {
          setIsModalOpen(true);
          onClick && onClick();
        }}
        className={buttonStyle}
      >
        {buttonContent}
      </button>
    </>
  );
};

/**
 *
 * @param { Object } - Expects a children element wich will be the content you want to be shown in the modal, the button content wich will be the content of the button that will open the modal screen, the width and height of the modal, the style of the button wich will open the modal, and an optional title for the modal window
 * @returns A button wich will open a modal screen
 */
const MODAL = ({
  children,
  buttonContent,
  width,
  height,
  buttonStyle,
  title,
  windowStyle = "fixed top-0 left-0 min-h-[100dvh] min-w-[100vw] bg-[#00000070] flex justify-center items-center z-30",
  onClick,
}: {
  children: JSX.Element | JSX.Element[];
  buttonContent: JSX.Element | JSX.Element[] | string;
  width: string;
  height: string;
  buttonStyle?: string;
  windowStyle?: string;
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <ModalProvider>
      <MODAL_WINDOW
        buttonContent={buttonContent}
        windowStyle={windowStyle}
        width={width}
        onClick={onClick}
        height={height}
        buttonStyle={buttonStyle}
        title={title}
      >
        {children}
      </MODAL_WINDOW>
    </ModalProvider>
  );
};

export default MODAL;
