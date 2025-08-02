import { Route, Routes } from "react-router-dom";
import "./App.css";

// Pages & Components
import HomePage from "./Pages/HomePage/HomePage";
import ProjectManager from "./Pages/ProjectManagerPage/ProjectManagerPage";
import AddProject from "./Components/Addproject/Addproject";
import UpdateSingleProject from "./Pages/UpdateSingleProject";

import DeleteSingleProject from "./Pages/DeleteSingleProject";
import ViewProject from "./Pages/ViewProject";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AllUsers from "./Pages/AllUsers";
import SingleUser from "./Pages/SingleUser";
import EditUser from "./Pages/EditUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allprojects" element={<ProjectManager />} />
        <Route path="/addproject" element={<AddProject />} />

        {/* View single project */}
        <Route path="/userdetails/:id" element={<ViewProject />} />

        {/* Edit single project */}
        <Route path="/userdetails/edit/:id" element={<UpdateSingleProject />} />

        {/* Delete single project */}
        <Route
          path="/userdetails/delete/:id"
          element={<DeleteSingleProject />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/user/:id" element={<SingleUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
