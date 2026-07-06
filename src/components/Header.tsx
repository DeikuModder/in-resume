import Logo from "@/assets/logo curriculum.webp";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import DesignsMenu from "./DesignsMenu";
import AuthModal from "./AuthModal";
import { useAuth } from "../Providers/useAuth";

const Header = () => {
  const { i18n, t } = useTranslation("global");
  const { user, logout, isLoading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <header className="bg-neutral-900 text-white h-[75px] w-[100%] flex justify-between items-center px-4 hideOnPrint">
      <DesignsMenu />

      <div className="flex justify-center items-center gap-2">
        <figure className="w-[50px]">
          <img src={Logo} className="w-[100%]" />
        </figure>
        <h1 className="font-bold text-2xl">IN-RESUMÉ</h1>
      </div>

      <div className="flex items-center gap-4">
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

        {!isLoading &&
          (user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-300 hidden sm:flex items-center gap-1">
                <FontAwesomeIcon icon={faUser} />
                {user.email}
              </span>
              <button
                title={t("auth.logout")}
                onClick={logout}
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="bg-white text-neutral-900 font-bold px-3 py-1 rounded-lg text-sm hover:bg-neutral-200 transition-colors"
            >
              {t("auth.sign-in")}
            </button>
          ))}
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
};

export default Header;
