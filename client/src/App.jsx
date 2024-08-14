import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {
  HomeLayout,Landing,Register,Login,DashboardLayout,Error,AddJob,AllJobs,Stats,Profile,Admin,EditJob
} from "./pages"

import {action as registerAction} from  "./pages/Register.jsx"
import {action as loginAction} from  "./pages/Login.jsx"
import { loader as dashboardLoader } from "./pages/DashboardLayout.jsx";
import { action as addJobAction } from "./pages/AddJob.jsx";
import { loader as allJobsLoader } from "./pages/AllJobs.jsx";
import { loader as editJobLoader } from "./pages/EditJob.jsx";
import { action as editJobAction } from "./pages/EditJob.jsx";
import { action as deleteJobAction } from "./pages/DeleteJob.jsx";
import { loader as adminLoader } from "./pages/Admin.jsx";
import { loader as statsLoader } from "./pages/Stats.jsx";
import { loader as appliedLoader } from "./pages/AppliedJobs.jsx";
import { loader as pendingLoader } from "./pages/PendingApplications.jsx";
import { action as profileAction } from "./pages/Profile.jsx";
import AppliedJobs from "./pages/AppliedJobs.jsx";
import PendingApplications from "./pages/PendingApplications.jsx";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme); // adds class dark-theme to body of document
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement:<Error/>,
    children: [
      {
        index:true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action:registerAction
      },
      {
        path: "login",
        element: <Login />,
        action:loginAction
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader:dashboardLoader,
        children:[
          {
            index:true,
            element:<AllJobs/>,
            loader:allJobsLoader,
          },
          {
            path:"stats",
            element:<Stats/>,
            loader:statsLoader
          },
          {
            path:"add-job",
            element:<AddJob/>,
            action:addJobAction
          },
          {
            path:"profile",
            element:<Profile/>,
            action:profileAction
          },
          {
            path:"admin",
            element:<Admin/>,
            loader:adminLoader
          },
          {
            path:"edit-job/:id",
            element:<EditJob/>,
            loader:editJobLoader,
            action:editJobAction
          },
          {
            path:"delete-job/:id",
            action:deleteJobAction
          },
          {
            path:"applied-jobs",
            element:<AppliedJobs/>,
            loader:appliedLoader
          },
          {
            path:"pendingApplications",
            element:<PendingApplications/>,
            loader:pendingLoader
          }
        ]
      },
    ],
  },
]);


function App() {

  return <RouterProvider router={router}/>
}

export default App
