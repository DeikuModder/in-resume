import { FormEvent, useState } from "react";
import PrintButton from "../PrintButton";
import Fieldset from "./Fieldset";
import Label from "./Label";
import Input from "./Input";
import { Education, Jobs, Projects, ResumeInfo } from "@/src/type";
import useCVInfo from "@/hooks/useCVInfo";
import "./scrollbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cvEmptyInfo: ResumeInfo = {
  name: "",
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
};

const FormMenu = () => {
  const [displayed, setDisplayed] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [formCv, setFormCv] = useState(cvEmptyInfo);
  const [education, setEducation] = useState({} as Education);
  const [experience, setExperience] = useState({} as Jobs);
  const [project, setProject] = useState({} as Projects);
  const { cvInfo, setCvInfo } = useCVInfo();

  const updateCVInfo = (newCvInfo: ResumeInfo) => {
    for (const property in newCvInfo) {
      if (newCvInfo[property] === "") {
        newCvInfo[property] = cvInfo[property];
      }
    }

    if (!Object.values(education).every((value) => value === "")) {
      newCvInfo.education.push(education);
    }

    if (!Object.values(experience).every((value) => value === "")) {
      newCvInfo.experience.push(experience);
    }

    if (!Object.values(project).every((value) => value === "")) {
      newCvInfo.projects.push(project);
    }

    setCvInfo(newCvInfo);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormCv(cvEmptyInfo);
    updateCVInfo({ ...formCv });
  };

  return (
    <div
      className={`
      ${displayed ? "translate-x-[0px]" : "translate-x-[350px]"} ${
        opacity ? "opacity-100" : "opacity-20"
      } hideOnPrint formMenu w-[400px] h-[100vh] fixed right-0 top-0 bg-neutral-800 shadow-lg shadow-neutral-900 transition-transform text-white p-4 overflow-auto`}
      onBlur={() => setOpacity(false)}
      onFocus={() => setOpacity(true)}
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
              value={project.tags ? project.tags.join(", ") : ""}
              onChange={(e) => {
                const tagsArray = e.target.value.split(",");
                setProject({ ...project, tags: tagsArray });
              }}
            />
          </Label>
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
