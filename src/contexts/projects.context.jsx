import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { UserContext } from "./user.context";

import { collection, query, onSnapshot } from "firebase/firestore";
import { db, getProjects } from "../utils/firebase/firebase.utils";

export const ProjectsContext = createContext({
  projectsMap: {},
});

export const ProjectProvider = ({ children }) => {
  const [projectsMap, setProjectsMap] = useState({});
  const { currentUser } = useContext(UserContext);

  const memoizedCallback = useCallback(() => {
    const onProjectStateChangedListener = (auth) => {
      if (!auth) return;
      const collectionRef = collection(db, "users", auth.uid, "projects");
      const q = query(collectionRef);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const getProjectsMap = async () => {
          const projectMap = await getProjects(currentUser);
          projectMap ? setProjectsMap(projectMap) : setProjectsMap({});
        };
        getProjectsMap();
      });
      return unsubscribe;
    };
    onProjectStateChangedListener(currentUser);
  }, [currentUser]);

 useEffect(() => {
  memoizedCallback();
 }, [memoizedCallback])


  const value = { projectsMap };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
