import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";

const Projects = () => {
  const { cvInfo, setCvInfo } = useCVInfo();

  const handleDelete = (index: number) => {
    const newCv = { ...cvInfo };
    newCv.projects.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <>
      {cvInfo.projects.length <= 0 ? (
        <></>
      ) : (
        <Section sectionTitle="Projects" sectionId="projects-section">
          <ul className=" inline-flex flex-wrap gap-4 list-none">
            {cvInfo.projects.map((project, index) => {
              return (
                <li
                  className="mb-8 border border-neutral-500 rounded-lg p-2 w-[200px] flex flex-col gap-2"
                  key={`project-${index}`}
                >
                  <div className="flex">
                    <a href={project.project_link} target="_blank">
                      <h3 className="text-lg font-semibold">
                        {project.project_name}
                      </h3>
                    </a>
                    <DeleteButton handleDelete={handleDelete} index={index} />
                  </div>
                  <p>{project.description}</p>
                  <div className="flex gap-2">
                    <p className="bg-neutral-300 w-fit p-1 rounded-lg">
                      {project.tags}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
};

export default Projects;
