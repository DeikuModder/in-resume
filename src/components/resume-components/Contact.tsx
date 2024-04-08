import useCVInfo from "@/hooks/useCVInfo";
import { Orientation } from "@/src/type";
import {
  faAddressBook,
  faMailBulk,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const Contact = ({
  title,
  orientation,
}: {
  title?: boolean;
  orientation?: Orientation;
}) => {
  const { cvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  return (
    <section>
      {title && <h3 className="text-2xl font-bold">{t("contact")}</h3>}
      <ul className={`p-2 list-none gap-3 text-sm flex ${orientation}`}>
        <li>
          <FontAwesomeIcon icon={faPhone} />{" "}
          {cvInfo.phone
            ? cvInfo.phone
            : t("personal-information.fallback-phone")}
        </li>
        <li>
          <FontAwesomeIcon icon={faMailBulk} />{" "}
          {cvInfo.email
            ? cvInfo.email
            : t("personal-information.fallback-email")}
        </li>
        <li>
          <FontAwesomeIcon icon={faAddressBook} />
          {cvInfo.address
            ? cvInfo.address
            : t("personal-information.fallback-address")}
        </li>
        <li>
          <a href={cvInfo.linkedinUrl} target="_blank">
            {cvInfo.linkedinUrl ? cvInfo.linkedinUrl : ""}
          </a>
        </li>
        <li>
          <a href={cvInfo.gitHubUrl} target="_blank">
            {cvInfo.gitHubUrl ? cvInfo.gitHubUrl : ""}
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Contact;
