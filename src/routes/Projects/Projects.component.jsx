import { useContext } from "react";
import FormDialog from "../../components/form-dialog/form-dialog.component";
import { ProjectsContext } from "../../contexts/projects.context";

import OutlinedCard from "../../components/cards/ProjectCard.component";

import "./projects.styles.css"

const Projects = () => {
  const { projectsMap } = useContext(ProjectsContext);

  return (
    <>
      <h2>Projects</h2>
      <FormDialog />
      <div className="projects-container">
           {Object.keys(projectsMap).map((id) => {
          const project = projectsMap[id];
          return (
              <OutlinedCard key={id} id={id} name={project.name}></OutlinedCard>
          );
        })}
      </div>
    </>
  );
};

export default Projects;
