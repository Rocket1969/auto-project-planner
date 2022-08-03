import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDdAnv82WmqCbaA1uhvW_7lCXxKjGvA-s",

  authDomain: "auto-project-planner.firebaseapp.com",

  projectId: "auto-project-planner",

  storageBucket: "auto-project-planner.appspot.com",

  messagingSenderId: "222564332865",

  appId: "1:222564332865:web:802a75cd9d61d795ac5dc0",

  measurementId: "G-3PR5JWH456",
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user.", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createProject = async (userAuth, name) => {
  if (!userAuth || !name) return;
  const projectCollectionRef = collection(
    db,
    "users",
    userAuth.uid,
    "projects"
  );
  const createdAt = new Date();
  try {
    const docRef = await addDoc(projectCollectionRef, {
      createdAt,
      name,
    });
    return docRef;
  } catch (error) {
    console.log("Error creating project.");
  }
};

export const createProjectTask = async (userAuth, projectId, name) => {
  if(!userAuth || !projectId || !name) return 
  const taskCollectionRef = collection(db, "users", userAuth.uid, "projects", projectId, "tasks");
  const createdAt = new Date();
  const isComplete = false;
  try {
    const docRef = await addDoc(taskCollectionRef, {
      createdAt,
      name,
      isComplete
    });
    return docRef;
  } catch (error) {
    console.log("Error creating project.");
  }
}


export const getProjects = async (userAuth) => {
  if (!userAuth) return;
  const projectsCollectionRef = collection(
    db,
    "users",
    userAuth.uid,
    "projects"
  );
  const q = query(projectsCollectionRef);
  try {
    const querySnapshot = await getDocs(q);
    const projectMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const id = docSnapshot.id;
      const { name } = docSnapshot.data();
      acc[id] = {id, name};
      return acc;
    }, {});
    return projectMap;
  } catch (error) {
    console.log("Error getting project docs.");
  }
};

export const getProjectTasks = async(userAuth, projectId) => {
    if(!userAuth || !projectId) return;
    const tasksCollectionRef = collection(db, "users", userAuth.uid, "projects", projectId, "tasks")
    const q = query(tasksCollectionRef);
    try {
      const querySnapshot = await getDocs(q);
      const taskMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const id = docSnapshot.id;
        const { name } = docSnapshot.data();
        acc[id] = {id, name};
        return acc;
      }, {});
      return taskMap;
    } catch (error) {
      console.log("Error getting task docs.");
    }
};

export const deleteProject = async(userAuth, projectId) => {
  if(!userAuth || !projectId) return;
  try {
    await deleteDoc(doc(db, "users", userAuth.uid, "projects", projectId))
  } catch (error) {
    console.log("Error deleting project.", error)
  }
}

export const deleteProjectTask = async(userAuth, projectId, taskId) => {
  if(!userAuth || !projectId || !taskId)
  try {
    await deleteDoc(doc(db, "users", userAuth.uid, "projects", projectId, "tasks", taskId))
  } catch (error) {
    console.log("Error deleting task.")
  }
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);