import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";

import ProjectManager from "./Pages/ProjectManagerPage/ProjectManagerPage";
import AddProject from "./Components/Addproject/Addproject";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allprojects" element={<ProjectManager />} />
        <Route path="/addproject" element={<AddProject />} />
      </Routes>
    </>
  );
}

export default App;
