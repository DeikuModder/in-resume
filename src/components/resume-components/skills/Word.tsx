import Template from "./Template";
import WordLogo from "../../../assets/word.svg";

const Word = () => {
  return (
    <Template name="Word">
      <img src={WordLogo} alt="word logo" />
    </Template>
  );
};

export default Word;
