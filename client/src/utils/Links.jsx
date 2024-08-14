import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiHourglass } from 'react-icons/bi';
import { FiCheckSquare } from "react-icons/fi";


const links = [
  { text: "add job", path: "add-job", icon: <FaWpforms /> },
  { text: "all jobs", path: ".", icon: <MdQueryStats /> },
  { text: "stats", path: "stats", icon: <IoBarChartSharp /> },
  { text: "profile", path: "profile", icon: <ImProfile /> },
  { text: "admin", path: "admin", icon: <MdAdminPanelSettings /> },
  { text: "applied jobs", path: "applied-jobs", icon: <FiCheckSquare /> },
  {
    text: "pending applications",
    path: "pendingApplications",
    icon: <BiHourglass />,
  },
];

export default links;