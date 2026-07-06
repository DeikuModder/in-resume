import { useRef } from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCVInfo from "@/hooks/useCVInfo";
import PrintButton from "./PrintButton";

const Toolbar = () => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCvInfo({ ...cvInfo, pictureUrl: url });
  };

  return (
    <div className="hideOnPrint fixed bottom-6 right-6 flex items-center gap-2 z-50">
      <label
        className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full shadow-lg transition-colors"
        title="Upload photo"
      >
        <FontAwesomeIcon icon={faCamera} />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
      <PrintButton />
    </div>
  );
};

export default Toolbar;
