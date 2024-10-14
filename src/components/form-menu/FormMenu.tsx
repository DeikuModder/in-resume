import { ChangeEvent, FormEvent, useRef, useState } from "react";
import PrintButton from "../PrintButton";
import Fieldset from "./Fieldset";
import Label from "./Label";
import Input from "./Input";
import {
  Certificates,
  Education,
  Jobs,
  Languages,
  Projects,
  ResumeInfo,
  SoftSkill,
} from "@/src/type";
import useCVInfo from "@/hooks/useCVInfo";
import "./scrollbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { updateArray } from "../utils/updateArray";
import { useTranslation } from "react-i18next";
import cvEmptyInfo from "@/utils/cvEmpty";
import { checkArray } from "../utils/checkArray";

const FormMenu = () => {
  const [displayed, setDisplayed] = useState(false);
  const [formCv, setFormCv] = useState(cvEmptyInfo);
  const [education, setEducation] = useState({} as Education);
  const [experience, setExperience] = useState({} as Jobs);
  const [project, setProject] = useState({} as Projects);
  const [language, setLanguage] = useState({} as Languages);
  const [certificate, setCertificate] = useState({} as Certificates);
  const [softSkill, setSoftSkill] = useState({} as SoftSkill);
  const imageInputRef = useRef(null);
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    setCvInfo({ ...cvInfo, pictureUrl: url });
  };

  const updateCVInfo = (newCvInfo: ResumeInfo) => {
    //todo: make this a better general funcion for checking if the local storage data lacks new info
    if (!cvInfo.softSkills) {
      setCvInfo({ ...cvInfo, softSkills: [] });
    }

    // first check if new info has empty, undefined, or empty array data, in case of that, replace it for the previous data
    for (const property in newCvInfo) {
      if (!newCvInfo[property]) {
        newCvInfo[property] = cvInfo[property];
      }
    }

    newCvInfo.education = checkArray(newCvInfo.education, cvInfo.education);
    newCvInfo.experience = checkArray(newCvInfo.experience, cvInfo.experience);
    newCvInfo.projects = checkArray(newCvInfo.projects, cvInfo.projects);
    newCvInfo.languages = checkArray(newCvInfo.languages, cvInfo.languages);
    newCvInfo.skills = checkArray(newCvInfo.skills, cvInfo.skills);
    newCvInfo.certificates = checkArray(
      newCvInfo.certificates,
      cvInfo.certificates
    );
    newCvInfo.softSkills = checkArray(newCvInfo.softSkills, cvInfo.softSkills);

    //check if each object has keys in it, and the values are valid to push to array
    updateArray(education, cvInfo.education, newCvInfo.education);
    updateArray(experience, cvInfo.experience, newCvInfo.experience);
    updateArray(project, cvInfo.projects, newCvInfo.projects);
    updateArray(language, cvInfo.languages, newCvInfo.languages);
    updateArray(certificate, cvInfo.certificates, newCvInfo.certificates);
    updateArray(softSkill, cvInfo.softSkills, newCvInfo.softSkills);

    //update info in local storage
    setCvInfo(newCvInfo);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateCVInfo({ ...formCv });
    setFormCv(cvEmptyInfo);
    setEducation({} as Education);
    setExperience({} as Jobs);
    setProject({} as Projects);
    setLanguage({} as Languages);
    setCertificate({} as Certificates);
    setSoftSkill({} as SoftSkill);
  };

  const handleInputChange = (field: string) => {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormCv((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  };

  return (
    <div
      className={`
      ${
        displayed
          ? "translate-x-[0px] opacity-100"
          : "translate-x-[310px] opacity-20"
      } hideOnPrint formMenu sm:w-[400px] h-[100%] fixed right-0 top-0 bg-neutral-800 shadow-lg shadow-neutral-900 transition-transform text-white p-4 overflow-auto -z-0`}
    >
      <div className="w-[100%] p-2">
        <button
          className="text-xl font-bold"
          onClick={() => setDisplayed(!displayed)}
        >
          <FontAwesomeIcon icon={displayed ? faArrowRight : faArrowLeft} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <Fieldset
          fieldsetLegend={t("personal-information.title")}
          fieldsetTitle="Personal Info section"
        >
          <Label>
            {t("form-menu.personal-info.name-label")}
            <Input value={formCv.name} onChange={handleInputChange("name")} />
          </Label>

          <Label
            additionalClass="bg-neutral-100 font-bold text-lg text-neutral-900 p-2 rounded-lg w-fit my-4 cursor-pointer"
            id="picture-button"
          >
            {t("picture-button")}
            <Input
              inputType="file"
              ref={imageInputRef}
              onChange={handleImageUpload}
              additionalClass="hidden"
            />
          </Label>

          <Label>
            {t("form-menu.personal-info.role-label")}
            <Input value={formCv.role} onChange={handleInputChange("role")} />
          </Label>

          <Label>
            {t("form-menu.personal-info.address-label")}
            <Input
              value={formCv.address}
              onChange={handleInputChange("address")}
            />
          </Label>

          <Label>
            {t("form-menu.personal-info.email-label")}
            <Input
              inputType="email"
              value={formCv.email}
              onChange={handleInputChange("email")}
            />
          </Label>

          <Label>
            {t("form-menu.personal-info.phone-label")}
            <Input
              inputType="tel"
              value={formCv.phone}
              onChange={handleInputChange("phone")}
            />
          </Label>

          <Label>
            {t("form-menu.personal-info.secondary-phone-label")}
            <Input
              inputType="tel"
              value={formCv.secondaryPhone}
              onChange={handleInputChange("secondaryPhone")}
              placeHolder={t("optional")}
            />
          </Label>

          <Label>
            {t("form-menu.personal-info.linkedin-label")}
            <Input
              placeHolder={t("form-menu.personal-info.linkedin-placeholder")}
              value={formCv.linkedinUser}
              onChange={handleInputChange("linkedinUser")}
            />
          </Label>

          <Label>
            {t("form-menu.personal-info.linkedin-url-label")}
            <Input
              placeHolder={t("form-menu.personal-info.linkedin-placeholder")}
              value={formCv.linkedinUrl}
              onChange={handleInputChange("linkedinUrl")}
            />
          </Label>

          <Label>
            {t("form-menu.personal-info.github-label")}
            <Input
              placeHolder={t("form-menu.personal-info.github-placeholder")}
              value={formCv.gitHubUser}
              onChange={handleInputChange("gitHubUser")}
            />
          </Label>

          <Label>
            {t("form-menu.personal-info.github-url-label")}
            <Input
              placeHolder={t("form-menu.personal-info.github-placeholder")}
              value={formCv.gitHubUrl}
              onChange={handleInputChange("gitHubUrl")}
            />
          </Label>
        </Fieldset>

        <Fieldset
          fieldsetLegend={t("about-me.title")}
          fieldsetTitle="About-me-section"
        >
          <Label>
            <textarea
              placeholder={t("form-menu.about-me.summary-placeholder")}
              className="px-2 font-light text-xl text-black rounded-lg"
              rows={4}
              value={formCv.aboutMe}
              onChange={handleInputChange("aboutMe")}
            />
          </Label>
        </Fieldset>

        <Fieldset
          fieldsetLegend={t("experience.title")}
          fieldsetTitle="Experience-section"
        >
          <Label>
            {t("form-menu.experience.company-name-label")}
            <Input
              value={experience.company_name}
              onChange={(e) => {
                const newCompanyName = e.target.value;
                setExperience({ ...experience, company_name: newCompanyName });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.experience.company-link-label")}
            <Input
              inputType="url"
              value={experience.company_link}
              onChange={(e) => {
                const companyLink = e.target.value;
                setExperience({ ...experience, company_link: companyLink });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.experience.company-role-label")}
            <Input
              value={experience.role}
              onChange={(e) => {
                const newWorkRole = e.target.value;
                setExperience({ ...experience, role: newWorkRole });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.experience.summary-label")}
            <textarea
              className="px-2 font-light text-xl text-black rounded-lg"
              rows={4}
              value={experience.summary}
              onChange={(e) => {
                const newSummary = e.target.value;
                setExperience({ ...experience, summary: newSummary });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.experience.start-year-label")}
            <Input
              value={experience.start_date}
              onChange={(e) => {
                const newWorkStartDate = e.target.value;
                setExperience({ ...experience, start_date: newWorkStartDate });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.experience.end-year-label")}
            <Input
              placeHolder={t("form-menu.placeholder-end-year")}
              value={experience.end_date}
              onChange={(e) => {
                const newWorkEndDate = e.target.value;
                setExperience({ ...experience, end_date: newWorkEndDate });
              }}
            />
          </Label>
        </Fieldset>

        <Fieldset
          fieldsetLegend={t("education.title")}
          fieldsetTitle="Education-section"
        >
          <Label>
            {t("form-menu.education.institution-name-label")}
            <Input
              value={education.institution_name}
              onChange={(e) => {
                const newInstitutionName = e.target.value;
                setEducation({
                  ...education,
                  institution_name: newInstitutionName,
                });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.education.title-label")}
            <Input
              value={education.title}
              onChange={(e) => {
                const newTitle = e.target.value;
                setEducation({
                  ...education,
                  title: newTitle,
                });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.education.start-year-label")}
            <Input
              value={education.start_date}
              onChange={(e) => {
                const newStartDate = e.target.value;
                setEducation({
                  ...education,
                  start_date: newStartDate,
                });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.education.end-year-label")}
            <Input
              placeHolder={t("form-menu.placeholder-end-year")}
              value={education.end_date}
              onChange={(e) => {
                const newEndDate = e.target.value;
                setEducation({
                  ...education,
                  end_date: newEndDate,
                });
              }}
            />
          </Label>
        </Fieldset>

        <Fieldset
          fieldsetLegend={t("certificates.title")}
          fieldsetTitle="Certificates-section"
        >
          <Label>
            {t("form-menu.certificates.title-label")}
            <Input
              value={certificate.title}
              onChange={(e) => {
                const newCertificateTitle = e.target.value;
                setCertificate({ ...certificate, title: newCertificateTitle });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.certificates.link-label")}
            <Input
              inputType="url"
              value={certificate.link}
              onChange={(e) => {
                const newCertificateLink = e.target.value;
                setCertificate({ ...certificate, link: newCertificateLink });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.certificates.issuer-label")}
            <Input
              value={certificate.issuing_authority}
              onChange={(e) => {
                const newIssuer = e.target.value;
                setCertificate({
                  ...certificate,
                  issuing_authority: newIssuer,
                });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.certificates.date-label")}
            <Input
              value={certificate.date}
              inputType="date"
              onChange={(e) => {
                const newDate = e.target.value;
                setCertificate({ ...certificate, date: newDate });
              }}
            />
          </Label>
        </Fieldset>

        <Fieldset
          fieldsetLegend={t("projects.title")}
          fieldsetTitle="Projects-section"
        >
          <Label>
            {t("form-menu.projects.project-name-label")}
            <Input
              value={project.project_name}
              onChange={(e) => {
                const newProjectName = e.target.value;
                setProject({ ...project, project_name: newProjectName });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.projects.project-link-label")}
            <Input
              inputType="url"
              value={project.project_link}
              onChange={(e) => {
                const newProjectLink = e.target.value;
                setProject({ ...project, project_link: newProjectLink });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.projects.description-label")}
            <textarea
              className="px-2 font-light text-xl text-black rounded-lg"
              rows={3}
              value={project.description}
              onChange={(e) => {
                const newDescription = e.target.value;
                setProject({ ...project, description: newDescription });
              }}
            />
          </Label>

          <Label>
            {t("form-menu.projects.tags-label")}
            <Input
              value={project.tags}
              onChange={(e) => {
                const tags = e.target.value;
                setProject({ ...project, tags: tags });
              }}
            />
          </Label>
        </Fieldset>

        <Fieldset
          fieldsetLegend={t("languages.title")}
          fieldsetTitle="Languages-section"
        >
          <div>
            <Label>
              {t("form-menu.languages.language-name-label")}
              <Input
                placeHolder={t("form-menu.languages.language-name-placeholder")}
                value={language.languageName}
                onChange={(e) => {
                  const newLanguageName = e.target.value;
                  setLanguage({ ...language, languageName: newLanguageName });
                }}
              />
            </Label>

            <Label>
              {t("form-menu.languages.level-label")}
              <select
                defaultValue={language.level}
                onChange={(e) => {
                  const newLanguageLevel = e.target.value;
                  setLanguage({ ...language, level: newLanguageLevel });
                }}
                className="text-black"
              >
                <option value="" hidden>
                  {t("form-menu.languages.level-input")}
                </option>
                <option value={t("form-menu.languages.level-options.basic")}>
                  {t("form-menu.languages.level-options.basic")}
                </option>
                <option
                  value={t("form-menu.languages.level-options.intermediate")}
                >
                  {t("form-menu.languages.level-options.intermediate")}
                </option>
                <option value={t("form-menu.languages.level-options.advanced")}>
                  {t("form-menu.languages.level-options.advanced")}
                </option>
                <option value={t("form-menu.languages.level-options.native")}>
                  {t("form-menu.languages.level-options.native")}
                </option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </Label>
          </div>
        </Fieldset>

        <Fieldset
          fieldsetLegend={t("soft-skills.title")}
          fieldsetTitle="Soft-skills-section"
        >
          <div>
            <Label>
              {t("form-menu.soft-skills.name-label")}
              <Input
                value={softSkill.name}
                onChange={(e) =>
                  setSoftSkill({ ...softSkill, name: e.target.value })
                }
              />
            </Label>

            <Label>
              {t("form-menu.soft-skills.description-label")}
              <Input
                value={softSkill.description}
                onChange={(e) =>
                  setSoftSkill({ ...softSkill, description: e.target.value })
                }
              />
            </Label>
          </div>
        </Fieldset>

        <div className="p-2 flex gap-2">
          <button
            type="submit"
            className="bg-neutral-100 font-bold text-lg text-neutral-900 p-2 rounded-lg"
          >
            {t("save-changes-button")}
          </button>
          <PrintButton />
        </div>
      </form>
    </div>
  );
};

export default FormMenu;
