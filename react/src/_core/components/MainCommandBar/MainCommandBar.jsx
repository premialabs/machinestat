import React, { useContext, useState } from "react"
import { IconSidebarX, IconSignout, IconSignoutCircle, IconBell, IconDropDown, IconKey } from '../../utilities/svg-icons';
import { useParams } from "react-router-dom";
import EventBus from "../../utilities/event-bus";
import AuthContext from "../../providers/AuthContext";
import GlobalStateContext from "../../providers/GlobalStateContext";
import { Button } from "../index";


const MainCommandBar = (props) => {
  let auth = useContext(AuthContext);
  let id = useParams().id;
  let globalState = useContext(GlobalStateContext);
  const refresh = () => {
    EventBus.dispatch("loadHeader", id);
  }
  const logout = () => {
    auth.logout();
  }

  const handleSysMenuClick = () =>{
    globalState.write('sysMenuShown', !globalState.state.sysMenuShown);
  }

  return (

    <div className=" w-full grid grid-cols-2  pr-10 ">
      <div className= { props.sidebarCollapsed ? " pl-2 " : " hidden "}>
      <Button
          variant="transparent"
          className=" px-1 "
          text=""
          callback={props.handleSideBarButton}
          icon={{ component: <IconSidebarX />, width: 25, color: "gray" }}
        />
      </div>
      <div className="flex justify-end items-center col-start-2">
        <Button
          variant="transparent"
          className="h-10 px-2 mr-6 "
          text=""
          disabled={auth.isAuthWaiting}
          animate={auth.isAuthWaiting}
          callback={null}
          icon={{ component: <IconBell />, width: 25, color: "#808080" }}
        />
        <div className="relative " 
          onClick={(e)=> {e.stopPropagation(); handleSysMenuClick()}}
          >
          <div className="flex items-center h-10 w-32 rounded-md hover:bg-gray-50 cursor-pointer">
            <img src="https://www.bootstrapdash.com/demo/stellar-admin/jquery/template/assets/images/faces/face8.jpg" className="h-7 w-7 rounded-full" alt=""/>
            <span className="font-poppins px-2" style={{fontSize:"12px"}}>{(auth.user? auth.user.name : "")}</span>
            <IconDropDown width="10" color="gray"></IconDropDown>
          </div>

          <div className={"absolute z-50 w-40 bg-white rounded-md top-12 right-0 shadow-lg font-poppins text-xs " + (globalState.state.sysMenuShown ? "" : "hidden")} >
            <div className="flex items-center text-md h-10 pl-4">
              <img src="https://www.bootstrapdash.com/demo/stellar-admin/jquery/template/assets/images/faces/face8.jpg" className="h-7 w-7 rounded-full" alt=""/>
              <span className="pl-2">{(auth.user? auth.user.name : "")}</span>
              </div>
            <hr></hr>
            <div className="flex items-center h-10  rounded-md pl-4">
              <IconKey width="15" color="black"></IconKey> 
              <span className="px-2 text-gray-600  ">Profile</span> 
            </div>
            <hr></hr>
            <div className="flex items-center h-10 hover:bg-sky-100  cursor-pointer rounded-md pl-4" onClick={(e) => { e.stopPropagation(); logout()}}>
              <IconSignoutCircle width="15" color="gray"></IconSignoutCircle> 
              <span className="px-2 text-gray-600  ">Logout</span> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainCommandBar