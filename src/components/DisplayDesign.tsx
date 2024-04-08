import useCVInfo from "../hooks/useCVInfo";
import BasicDesign from "./resume-designs/BasicDesign";
import AltDesign from "./resume-designs/AltDesign";

const DisplayDesign = () => {
  const { design } = useCVInfo();

  const designsArr = [BasicDesign, AltDesign];

  return <>{designsArr[design]()}</>;
};

export default DisplayDesign;
