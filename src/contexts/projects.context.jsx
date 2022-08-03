import { createContext, useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./user.context";

import { getProjects } from "../utils/firebase/firebase.utils";

export const ProjectsContext = createContext({
  projectsMap: {},
});

export const ProjectProvider = ({ children }) => {
  const [projectsMap, setProjectsMap] = useState({});
  const { currentUser } = useContext(UserContext);
  const projectMap  = useRef({});


  useEffect(() => {
    console.log("running.")
    const getProjectsMap = async () => {
      projectMap.current = await getProjects(currentUser);
      projectMap.current ? setProjectsMap(projectMap.current) : setProjectsMap({});
    };
    getProjectsMap();
  }, [currentUser]);

  const value = { projectsMap };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
