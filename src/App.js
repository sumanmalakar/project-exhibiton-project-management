import { Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
// import Admin from './components/Pages/Admin';
// import Logout from './components/Pages/Logout';
// import SuperAdmin from './components/Pages/SuperAdmin';
// import Supplier from './components/Pages/Supplier';
import PrivateRoute from './components/PrivateRoute';
// import Home from './components/design/Home';
import Navbar from './components/design/Navbar';
// import Feed from "./components/design/Feed";
import Dashboard from "./components/design/Dashboard";
import Projects from "./components/design/projects/Projects";
import Tasks from "./components/design/tasks/Tasks";
import Users from "./components/design/users/Users";
import Roles from "./components/design/roles/Roles";
import Teams from "./components/design/teams/Teams";
import Form from "./components/design/Form";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>

<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    
      <Routes>
        <Route index element={<Login />} />
        <Route  path="navbar" element={<PrivateRoute><Navbar /></PrivateRoute>} />
        {/* <Route path="feed" element={<Feed />} /> */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="teams" element={<Teams />} />
        <Route path="form" element={<Form />} />

        {/* <Route path="superadmin" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        <Route path="logout" element={<PrivateRoute><Logout /></PrivateRoute>} />  */}
    </Routes>    
    </>
  );
}

export default App;
