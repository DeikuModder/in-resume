import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const PrintButton = () => {
  const { t } = useTranslation("global");

  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      className="bg-neutral-100 font-bold text-lg text-neutral-900 p-2 rounded-lg"
      onClick={handlePrint}
    >
      {t("print-button")} <FontAwesomeIcon icon={faPrint} />
    </button>
  );
};

export default PrintButton;
