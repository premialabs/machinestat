import React, { Children, useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IconBuilding, IconChevronRight, IconCircle, IconCogs, IconSidebarX, IconCalendar, IconEquipment, IconHome, IconJobCard } from "../../utilities/svg-icons";
import ecopowlogo from "../../../assets/ecopowlogo1.svg"
import AuthContext from "../../providers/AuthContext";
import { Button } from "../index";

const Sidebar = ({ className, sidebarCollapsed, hanldeSidebarCollapsed, handleSideBarButton }) => {
  let auth = useContext(AuthContext);

  return (
    <div className={"w-full font-inter " +(sidebarCollapsed ? "hidden" : "")}>
      <RootNode path="" label="Home" />
      <RootNode path="devices" label="Devices" />
      <RootNode path="device-groups" label="Device Groups" />
    </div>
  )
}

const Banner = ({ height }) => {
  return (
    <section
      className={`w-full px-2 flex items-center bg-white`} >
      <img width="30" src={ecopowlogo} alt="raindrops" />
      <span className="pl-4 pt-2 text-gray-700 font-semibold font-publicSans" style={{fontSize : "16px"}}> Mach Stat</span>
    </section>
  )
}

const Folder = (props) => {
  let location = useLocation();
  const [folderCollapsed, setFolderCollapsed] = useState(false);
  const [content, setContent] = useState();

  useEffect(() => {
    if (location.pathname.split("/").includes(props.path)) {
      setFolderCollapsed(false);
    };
  }, [location.pathname, props.path])

  const collapseFolder = (e, val) => {
    e.stopPropagation();
    setFolderCollapsed(val);
  }

  useEffect(() => {
    let _content = Children.map(props.children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          parentPath: props.parentPath ? (props.parentPath + "/" + props.path) : ("/" + props.path)
        });
      }
      return child;
    });

    setContent(_content);
  }, [props.children, props.parentPath, props.path])

  return (
    (Children.count(content) > 0) &&
    <div className=" rounded pt-2 pr-1">
        <div className={"py-1 pl-1 flex justify-between cursor-default " + (folderCollapsed ? "" : "")} onClick={(e) => collapseFolder(e, !folderCollapsed)}>
          <div className="flex items-start">
          {
            props.icon && <span>{props.icon}</span>
          }
          <span className={`text-gray-600 font-publicSans  text-sm  ml-3 `}>{props.label}</span>
          </div>

          <span className={"transition-all duration-300 align-middle " + (folderCollapsed ? "" : "rotate-90")}>
            <IconChevronRight width="16" color="grey" />
          </span>

      </div>
      <div className={(folderCollapsed ? "hidden" : "ml-3 ")}>
        {
          content
        }
      </div>
    </div >
  )
}

const Footer = (props) => {
  return (
    <div className="absolute bottom-0 w-full">
      {props.children}
    </div>
  )
}

const Section = (props) => {
  const [sectionCollapsed, setSectionCollapsed] = useState(props.collapsed);

  const collapseSection = (e, val) => {
    e.stopPropagation();
    setSectionCollapsed(val);
  }

  return (
    <div className={props.className} onClick={(e) => collapseSection(e, !sectionCollapsed)}>
      <div className="flex items-center justify-between w-full bg-zinc-200">
        <div className="p-1 text-zinc-500 w-full font-semibold uppercase text-xs ">{`${props.label} ${props.count ? " ( " + props.count + " )" : ""}`}</div>
      </div>
      <div className={(sectionCollapsed ? "hidden" : "")}>
        {props.children}
      </div>
    </div>
  )
}

const Node = (props) => {
  return (
    <div className={`w-full  hover:bg-[#F0F5FF] rounded-md`}>
      <NavLink
        onClick={
          e => {
            e.stopPropagation();
            if(props.matches){
              props.hanldeSidebarCollapsed();
            }
            return true;
          }
        }
        to={props.parentPath + "/" + (props.path ? props.path : "")}
        className={({ isActive }) =>
          " block py-2 px-1 rounded-md " + (isActive ? "  text-[#3B82F6]" : "text-gray-800 ")
        }
      >
        <div className="flex items-center">
          <span className={"transition-all duration-300 ml-3"}><IconCircle color="gray" width="12" /> </span>
          <span className="font-publicSans font-[500] text-pxs ml-3 ">{props.label}</span>
        </div>
      </NavLink>
    </div>
  )
}

const RootNode = (props) => {
  return (
    <div className={`w-full  hover:bg-[#F0F5FF] rounded-md`}>
      <NavLink
        onClick={
          e => {
            e.stopPropagation();
            if(props.matches){
              props.hanldeSidebarCollapsed();
            }
            return true;
          }
        }
        to={"/" + (props.path ? props.path : "")}
        className={({ isActive }) =>
          " block pt-2 px-1 rounded-md " + (isActive ? "  text-orange-600" : "text-gray-800 ")
        }
      >
        <div className="flex items-center">
          <span className={"transition-all duration-300 "}>{props.icon} </span>
          <span className="font-[500] text-pxs ml-3 ">{props.label}</span>
        </div>
      </NavLink>
    </div>
  )
}

const HomeNode = (props) => {
  return (
    <div className={`text-gray-900 px-1 hover:bg-[#F0F5FF] rounded-md`}>
      <NavLink
        onClick={
          e => {
            e.stopPropagation();
            return true;
          }
        }
        to="/"
        className={({ isActive }) =>
          " block py-3  rounded-md " + (isActive ? " font-semibolds text-[#10A6E9]" : "text-slate-600 ")
        }
      >
        <div className="flex items-center">
          <span className={"transition-all duration-300 "}>{props.icon}</span>
          <span className=" text-pxs font-publicSans ml-3">{props.label}</span>
        </div>
      </NavLink>
    </div>
  )
}

export default Sidebar;