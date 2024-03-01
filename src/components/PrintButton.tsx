import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      className="bg-neutral-100 font-bold text-lg text-neutral-900 p-2 rounded-lg"
      onClick={handlePrint}
    >
      Print CV <FontAwesomeIcon icon={faPrint} />
    </button>
  );
};

export default PrintButton;
