import { Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./Pages/HomePage/HomePage";
import ProjectManager from "./Pages/ProjectManagerPage/ProjectManagerPage";
import AddProject from "./Components/Addproject/Addproject";
import UpdateTask from "./Pages/UpdateTask";
import GetSingleTask from "./Pages/GetSingleTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allprojects" element={<ProjectManager />} />
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/task/:id" element={<GetSingleTask />} />
        <Route path="/task/edit/:id" element={<UpdateTask />} />
      </Routes>
    </>
  );
}

export default App;
