import useCVInfo from "@/hooks/useCVInfo";
import { Orientation } from "@/src/type";
import {
  faAddressBook,
  faMailBulk,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable/EditableText";

const LinkedInIcon = ({ fill }: { fill?: string }) => (
  <svg
    width="18"
    height="18"
    fill={fill ?? "currentColor"}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 256"
  >
    <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" />
  </svg>
);

const GitHubIcon = ({ fill }: { fill?: string }) => (
  <svg
    viewBox="0 0 256 250"
    fill={fill ?? "currentColor"}
    width={18}
    height={18}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
  >
    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Z" />
  </svg>
);

const Contact = ({
  title,
  orientation,
  font,
  textColor,
  extraStyle,
}: {
  title?: boolean;
  orientation?: Orientation;
  font?: string;
  textColor?: string;
  extraStyle?: string;
}) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  const set = (field: keyof typeof cvInfo) => (v: string) =>
    setCvInfo({ ...cvInfo, [field]: v });

  return (
    <section>
      {title && <h3 className="text-2xl font-bold">{t("contact")}</h3>}
      <ul
        className={`p-2 list-none gap-3 ${font} flex ${orientation} ${extraStyle}`}
      >
        <li>
          <FontAwesomeIcon icon={faPhone} />{" "}
          <EditableText
            value={cvInfo.phone}
            onChange={set("phone")}
            placeholder={t("personal-information.fallback-phone")}
          />
        </li>
        <li className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPhone} />
          <EditableText
            value={cvInfo.secondaryPhone ?? ""}
            onChange={set("secondaryPhone")}
            placeholder={t("optional")}
          />
        </li>
        <li>
          <FontAwesomeIcon icon={faMailBulk} />{" "}
          <EditableText
            value={cvInfo.email}
            onChange={set("email")}
            placeholder={t("personal-information.fallback-email")}
          />
        </li>
        <li>
          <FontAwesomeIcon icon={faAddressBook} />{" "}
          <EditableText
            value={cvInfo.address}
            onChange={set("address")}
            placeholder={t("personal-information.fallback-address")}
          />
        </li>
        <li className="flex items-center gap-2">
          <LinkedInIcon fill={textColor} />
          <EditableText
            value={cvInfo.linkedinUser ?? ""}
            onChange={set("linkedinUser")}
            placeholder="LinkedIn username"
          />
        </li>
        <li className="flex items-center gap-2">
          <GitHubIcon fill={textColor} />
          <EditableText
            value={cvInfo.gitHubUser ?? ""}
            onChange={set("gitHubUser")}
            placeholder="GitHub username"
          />
        </li>
      </ul>
    </section>
  );
};

export default Contact;
