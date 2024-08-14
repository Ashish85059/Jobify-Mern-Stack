import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import links from '../utils/Links'
import { NavLink } from 'react-router-dom'

const NavLinks = ({isBigSidebar}) => {
    const {toggleSidebar,user}=useDashboardContext()
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, icon, path } = link;
        const {role,mainRole}=user;
        if(path==='admin' && role!=='admin')return;
        if(path==="applied-jobs" && role!=="admin" && mainRole!=="Employee")return;
        if(path==="applied-jobs" && role==="admin")return;
        if(path==="add-job" && mainRole==="Employee")return;
        if(path==="pendingApplications"&& mainRole==="Employee")return;
        if(path==='stats' && mainRole==="Employee")return;
        if(path==='pendingApplications' && (role==="admin" || role=="demo"))return;
        
        
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar?null:toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks