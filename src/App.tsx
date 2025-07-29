import { Route, Routes } from "react-router-dom";
import "./App.css";

// Pages & Components
import HomePage from "./Pages/HomePage/HomePage";
import ProjectManager from "./Pages/ProjectManagerPage/ProjectManagerPage";
import AddProject from "./Components/Addproject/Addproject";
import UpdateSingleProject from "./Pages/UpdateSingleProject";

import DeleteSingleProject from "./Pages/DeleteSingleProject";
import ViewProject from "./Pages/ViewProject";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allprojects" element={<ProjectManager />} />
        <Route path="/addproject" element={<AddProject />} />

        {/* View single project */}
        <Route path="/task/:id" element={<ViewProject />} />

        {/* Edit single project */}
        <Route path="/task/edit/:id" element={<UpdateSingleProject />} />

        {/* Delete single project */}
        <Route path="/task/delete/:id" element={<DeleteSingleProject />} />
      </Routes>
    </>
  );
}

export default App;
