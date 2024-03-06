import { FormEvent, useRef, useState } from "react";
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
} from "@/src/type";
import useCVInfo from "@/hooks/useCVInfo";
import "./scrollbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { updateArray } from "../utils/updateArray";

const cvEmptyInfo: ResumeInfo = {
  name: "",
  pictureUrl: "",
  role: "",
  address: "",
  email: "",
  phone: "",
  linkedinUrl: "",
  gitHubUrl: "",
  aboutMe: "",
  projects: [],
  education: [],
  experience: [],
  languages: [],
  skills: [],
  certificates: [],
};

const FormMenu = () => {
  const [displayed, setDisplayed] = useState(false);
  const [formCv, setFormCv] = useState(cvEmptyInfo);
  const [education, setEducation] = useState({} as Education);
  const [experience, setExperience] = useState({} as Jobs);
  const [project, setProject] = useState({} as Projects);
  const [language, setLanguage] = useState({} as Languages);
  const [certificate, setCertificate] = useState({} as Certificates);
  const imageInputRef = useRef(null);
  const { cvInfo, setCvInfo } = useCVInfo();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    setCvInfo({ ...cvInfo, pictureUrl: url });
  };

  const updateCVInfo = (newCvInfo: ResumeInfo) => {
    // first check if new info has empty, undefined, or empty array data, in case of that, replace it for the previous data
    for (const property in newCvInfo) {
      if (!newCvInfo[property]) {
        newCvInfo[property] = cvInfo[property];
      }
    }

    newCvInfo.education.length <= 0 && (newCvInfo.education = cvInfo.education);
    newCvInfo.experience.length <= 0 &&
      (newCvInfo.experience = cvInfo.experience);
    newCvInfo.projects.length <= 0 && (newCvInfo.projects = cvInfo.projects);
    newCvInfo.languages.length <= 0 && (newCvInfo.languages = cvInfo.languages);
    newCvInfo.skills.length <= 0 && (newCvInfo.skills = cvInfo.skills);
    newCvInfo.certificates.length <= 0 &&
      (newCvInfo.certificates = cvInfo.certificates);

    //check if each object has keys in it, and the values are valid to push to array
    updateArray(education, cvInfo.education, newCvInfo.education);
    updateArray(experience, cvInfo.experience, newCvInfo.experience);
    updateArray(project, cvInfo.projects, newCvInfo.projects);
    updateArray(language, cvInfo.languages, newCvInfo.languages);
    updateArray(certificate, cvInfo.certificates, newCvInfo.certificates);

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
  };

  return (
    <div
      className={`
      ${
        displayed
          ? "translate-x-[0px] opacity-100"
          : "translate-x-[310px] opacity-20"
      } hideOnPrint formMenu w-[100%] md:w-[400px] h-[100%] fixed right-0 top-0 bg-neutral-800 shadow-lg shadow-neutral-900 transition-transform text-white p-4 overflow-auto`}
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
          fieldsetLegend="Personal information"
          fieldsetTitle="Personal Info section"
        >
          <Label>
            Name:
            <Input
              value={formCv.name}
              onChange={(e) => {
                const newName = e.target.value;
                setFormCv({ ...formCv, name: newName });
              }}
            />
          </Label>

          <Label
            additionalClass="bg-neutral-100 font-bold text-lg text-neutral-900 p-2 rounded-lg w-fit my-4 cursor-pointer"
            id="picture-button"
          >
            Upload Picture
            <Input
              inputType="file"
              ref={imageInputRef}
              onChange={handleImageUpload}
              additionalClass="hidden"
            />
          </Label>

          <Label>
            Role:
            <Input
              value={formCv.role}
              onChange={(e) => {
                const newRole = e.target.value;
                setFormCv({ ...formCv, role: newRole });
              }}
            />
          </Label>

          <Label>
            Address
            <Input
              value={formCv.address}
              onChange={(e) => {
                const newAddress = e.target.value;
                setFormCv({ ...formCv, address: newAddress });
              }}
            />
          </Label>

          <Label>
            Email:
            <Input
              inputType="email"
              value={formCv.email}
              onChange={(e) => {
                const newEmail = e.target.value;
                setFormCv({ ...formCv, email: newEmail });
              }}
            />
          </Label>

          <Label>
            Phone:
            <Input
              inputType="tel"
              value={formCv.phone}
              onChange={(e) => {
                const newPhone = e.target.value;
                setFormCv({ ...formCv, phone: newPhone });
              }}
            />
          </Label>

          <Label>
            Linkedin:
            <Input
              inputType="url"
              placeHolder="Leave it blank if you don't have a Linkedin"
              value={formCv.linkedinUrl}
              onChange={(e) => {
                const newLinkedinUrl = e.target.value;
                setFormCv({ ...formCv, linkedinUrl: newLinkedinUrl });
              }}
            />
          </Label>

          <Label>
            GitHub:
            <Input
              inputType="url"
              placeHolder="Leave it blank if you don't have a Github"
              value={formCv.gitHubUrl}
              onChange={(e) => {
                const newGithubUrl = e.target.value;
                setFormCv({ ...formCv, gitHubUrl: newGithubUrl });
              }}
            />
          </Label>
        </Fieldset>

        <Fieldset fieldsetLegend="About me" fieldsetTitle="About-me-section">
          <Label>
            <textarea
              placeholder="Brief summary about you"
              className="px-2 font-light text-xl text-black rounded-lg"
              rows={4}
              value={formCv.aboutMe}
              onChange={(e) => {
                const newSummary = e.target.value;
                setFormCv({ ...formCv, aboutMe: newSummary });
              }}
            />
          </Label>
        </Fieldset>

        <Fieldset
          fieldsetLegend="Experience"
          fieldsetTitle="Experience-section"
        >
          <Label>
            Company Name:
            <Input
              value={experience.company_name}
              onChange={(e) => {
                const newCompanyName = e.target.value;
                setExperience({ ...experience, company_name: newCompanyName });
              }}
            />
          </Label>

          <Label>
            Company Link:
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
            Role at company:
            <Input
              value={experience.role}
              onChange={(e) => {
                const newWorkRole = e.target.value;
                setExperience({ ...experience, role: newWorkRole });
              }}
            />
          </Label>

          <Label>
            Summary:
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
            Start year:
            <Input
              value={experience.start_date}
              onChange={(e) => {
                const newWorkStartDate = e.target.value;
                setExperience({ ...experience, start_date: newWorkStartDate });
              }}
            />
          </Label>

          <Label>
            End year:
            <Input
              placeHolder="Leave it blank if still on it"
              value={experience.end_date}
              onChange={(e) => {
                const newWorkEndDate = e.target.value;
                setExperience({ ...experience, end_date: newWorkEndDate });
              }}
            />
          </Label>
        </Fieldset>

        <Fieldset fieldsetLegend="Education" fieldsetTitle="Education-section">
          <Label>
            Institution name:
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
            Title:
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
            Start year:
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
            End year:
            <Input
              placeHolder="Leave it blank if still on it"
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
          fieldsetLegend="Certificates"
          fieldsetTitle="Certificates-section"
        >
          <Label>
            Title:
            <Input
              value={certificate.title}
              onChange={(e) => {
                const newCertificateTitle = e.target.value;
                setCertificate({ ...certificate, title: newCertificateTitle });
              }}
            />
          </Label>

          <Label>
            Link:
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
            Issuer:
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
            Date
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

        <Fieldset fieldsetLegend="Projects" fieldsetTitle="Projects-section">
          <Label>
            Project name:
            <Input
              value={project.project_name}
              onChange={(e) => {
                const newProjectName = e.target.value;
                setProject({ ...project, project_name: newProjectName });
              }}
            />
          </Label>

          <Label>
            Link to the project:
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
            Description:
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
            Tags:
            <Input
              value={project.tags}
              onChange={(e) => {
                const tags = e.target.value;
                setProject({ ...project, tags: tags });
              }}
            />
          </Label>
        </Fieldset>

        <Fieldset fieldsetLegend="Languages" fieldsetTitle="Languages-section">
          <div>
            <Label>
              Language name:
              <Input
                placeHolder="Eg. Spanish..."
                value={language.languageName}
                onChange={(e) => {
                  const newLanguageName = e.target.value;
                  setLanguage({ ...language, languageName: newLanguageName });
                }}
              />
            </Label>
            <Label>
              Level:
              <select
                defaultValue={language.level}
                onChange={(e) => {
                  const newLanguageLevel = e.target.value;
                  setLanguage({ ...language, level: newLanguageLevel });
                }}
                className="text-black"
              >
                <option value="" hidden>
                  Select level
                </option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
              </select>
            </Label>
          </div>
        </Fieldset>

        <div className="p-2 flex gap-2">
          <button
            type="submit"
            className="bg-neutral-100 font-bold text-lg text-neutral-900 p-2 rounded-lg"
          >
            Update
          </button>
          <PrintButton />
        </div>
      </form>
    </div>
  );
};

export default FormMenu;
