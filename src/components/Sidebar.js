import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { SiHomebridge } from "react-icons/si";
import { SidebarData } from "../data/SidebarData";
const Sidebar = () => {
  return (
    <>
      <div id="icon_head">
        <SiHomebridge id="icon_main" />
      </div>
      <div id="icons_group">
        {SidebarData.map((curElm) => {
          const { id, icon, link, name } = curElm;
          return (
            <NavLink
              key={id}
              to={link}
              activeClassName="link_btn"
              style={{ textDecoration: "none" }}
            >
              <div className="icon_wrapper">
                <FontAwesomeIcon icon={icon} className="icons_link" />
                <span className="icon_name"> {name} </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
