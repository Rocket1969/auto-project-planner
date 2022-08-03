import { Routes, Route } from "react-router-dom";
import Nav from "./routes/Nav/Nav.component";
import Auth from "./routes/Auth/Auth.component";
import Projects from "./routes/Projects/Projects.component";
import Project from "./routes/Project/Project.component";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="projects" element={<Projects />} />
          <Route path="project">
            <Route path=":id" element={<Project />} />
          </Route>{" "}
          <Route path="auth" element={<Auth />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
