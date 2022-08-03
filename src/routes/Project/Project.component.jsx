import { useContext, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { ProjectsContext } from "../../contexts/projects.context";
import { createProjectTask, getProjectTasks } from "../../utils/firebase/firebase.utils";
import OutlinedCard from "../../components/cards/TaskCard.component";

import { TextField, Button, } from "@mui/material";
import "./project.styles.css";

import "./project.styles.css";

const Project = () => {
  const params = useParams();
  const projectId = params.id;

  const { currentUser } = useContext(UserContext);
  const { projectsMap } = useContext(ProjectsContext);
  const [taskName, setTaskName] = useState("");
  const [tasksMap, setTasksMap] = useState({});

  const project = Object.keys(projectsMap)
    .filter((id) => id.includes(projectId))
    .reduce((obj, id) => {
      return Object.assign(obj, {
        [id]: projectsMap[id],
      });
    }, {});

  useEffect(() => { 
  
    const getTasksMap = async () => {
    const taskMap = await getProjectTasks(currentUser, projectId);
    taskMap ? setTasksMap(taskMap) : setTasksMap({});
      console.log(taskMap)
  }; 
       getTasksMap();
  }, [projectId])
    

  const handleChange = (event) => {
    const { value } = event.target;
    setTaskName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createProjectTask(currentUser, projectId, taskName);
      setTaskName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="project-container">
      {project[projectId] ? <h2>{project[projectId].name}</h2> : ""}

      <form onSubmit={handleSubmit} className="task-form">
        <TextField label="Project Task" onChange={handleChange} value={taskName}></TextField>
        <Button type="submit" variant="contained">
          Add Task
        </Button>
      </form>
      <div className="tasks-container">
    {
      tasksMap ? (Object.keys(tasksMap).map((id) => {
          const task = tasksMap[id];
          return (
              <OutlinedCard key={id} projectId={projectId} taskId={id} name={task.name}></OutlinedCard>
          );
        })) :
        (
          ""
        )
    }
      </div>
    </div>
  );
};
export default Project;
