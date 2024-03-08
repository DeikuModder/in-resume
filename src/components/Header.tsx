import Logo from "@/assets/logo curriculum.webp";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n } = useTranslation("global");

  return (
    <header className="bg-neutral-900 text-white h-[75px] w-[100%] flex justify-center items-center hideOnPrint">
      <div className="w-[50px] md:w-[5%]">
        <img src={Logo} className="w-[100%]" />
      </div>
      <h1 className="font-bold text-2xl mr-12">IN-RESUMÉ</h1>
      <select
        defaultValue={window.localStorage.getItem("lang") || "en"}
        onChange={(e) => {
          i18n.changeLanguage(e.target.value);
          window.localStorage.setItem("lang", e.target.value);
        }}
        className="text-black font-bold"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </header>
  );
};

export default Header;
