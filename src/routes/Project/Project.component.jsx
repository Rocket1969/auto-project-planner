import { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { ProjectsContext } from "../../contexts/projects.context";
import { db, createProjectTask, getProjectTasks } from "../../utils/firebase/firebase.utils";
import { collection, query, onSnapshot } from "firebase/firestore";
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

    const memoizedCallback = useCallback(() => {
      const onTaskStateChangedListener = (auth, projectId) => {
        if (!auth) return;
        const collectionRef = collection(db, "users", auth.uid, "projects", projectId, "tasks");
        const q = query(collectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const geTasksMap = async () => {
            const taskMap = await getProjectTasks(currentUser, projectId);
            taskMap ? setTasksMap(taskMap) : setTasksMap({});
          };
          geTasksMap();
        });
        return unsubscribe;
      };
      onTaskStateChangedListener(currentUser, projectId);
    }, [currentUser, projectId]);
  
   useEffect(() => {
    memoizedCallback();
   }, [memoizedCallback])
    

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
        <TextField label="Task Name" onChange={handleChange} value={taskName}></TextField>
        <Button type="submit" variant="contained">
          Add Task
        </Button>
      </form>
      <div className="tasks-container">
    {
      tasksMap ? (Object.keys(tasksMap).map((id) => {
          const task = tasksMap[id];
          console.log(task);
          return (
              <OutlinedCard key={id} projectId={projectId} taskId={id} name={task.name} isComplete={task.isComplete}></OutlinedCard>
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
