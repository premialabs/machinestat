import React, { useContext, useRef, useState, useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ApiWaiting, BreadCrumbs, Loader, MainCommandBar, ToastContainer, Sidebar, Button } from "..";
import { DialogBoxProvider } from "../../providers/DialogBoxContext";
import GlobalStateContext from "../../providers/GlobalStateContext";
import { ToastProvider } from "../../providers/ToastContext";
import { DialogBoxContainer } from "../DialogBox";
import base_routes from "../../base-routes"
import app_routes from "../../../app/routes"
import PageToolBar from "../PageToolBar";


const PrivateAppShell = (props) => {
  let globalState = useContext(GlobalStateContext);
  let _routes = [];
  let hasRootRef = useRef(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);



  useEffect(() => {
    globalState.write('sysMenuShown', false);

    window.addEventListener("resize", handleWindowResize);
    document.body.addEventListener("click", handleBodyClick);
    handleWindowResize();

    return (() => {
      window.removeEventListener("resize", handleWindowResize);
      document.body.removeEventListener("click", handleBodyClick);
    })
  }, [])

  const handleWindowResize = () => {
    let vw = document.body.parentNode.clientWidth;
    if (vw > 1536) {
      setSidebarCollapsed(false);
    } else if (vw > 1280) {
      setSidebarCollapsed(false);
    } else if (vw > 1024) {
      setSidebarCollapsed(false);
    } else if (vw > 768) {
      setSidebarCollapsed(false);
    } else if (vw > 640) {
      setSidebarCollapsed(false);
    } else if (vw > 400) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(true);
    }
  }

  const handleBodyClick = () => {
    globalState.write('sysMenuShown', false)
  }

  const handleSideBarButton = () => {
    setSidebarCollapsed(prev => !prev);
  }

  hasRootRef.current = app_routes.reduce((acc, cur) => {
    acc = acc || (cur.path === '/')
    return acc
  }, false)

  if (hasRootRef.current) {
    _routes = [...base_routes.filter(item => item.path !== '/'), ...app_routes]
  } else {
    _routes = [...base_routes, ...app_routes]
  }

  return (
    <>
      <DialogBoxProvider>
        <ToastProvider>
          <ToastContainer />
          <DialogBoxContainer />
          <PageToolBar hanldeSidebarCollapsed={() => handleSideBarButton()} />
          <div className='flex'>
            {(typeof globalState.loadingSource !== 'undefined') && <ApiWaiting />}
            <div className={(sidebarCollapsed?"hidden":"w-64")}>
              <Sidebar className={" border-r-2 border-slate-100 "} sidebarCollapsed={sidebarCollapsed} hanldeSidebarCollapsed={() => handleSideBarButton()} handleSideBarButton={() => handleSideBarButton()} />
            </div>
            <React.Suspense fallback={<Loader />}>
              {props.children}
            </React.Suspense>
          </div>
          {/* <div className='flex h-screen bg-slate-50'>
            <Sidebar className={" border-r-2 border-slate-100 "} sidebarCollapsed={sidebarCollapsed} hanldeSidebarCollapsed={()=>handleSideBarButton()} handleSideBarButton={()=>handleSideBarButton()}/>
            <div className=" w-full ">
              <div className='w-full flex border-b justify-between items-center px-2 h-14 border-gray-200 bg-white'>
                <MainCommandBar  sidebarCollapsed={sidebarCollapsed}  handleSideBarButton={()=>handleSideBarButton()} />
              </div>
              <div className='ooverflow-y-auto px-6 pt-2'>
                {(typeof globalState.loadingSource !== 'undefined') && <ApiWaiting />}
                <React.Suspense fallback={<Loader />}>
                  {props.children}
                </React.Suspense>
              </div>
            </div>
          </div> */}
        </ToastProvider>
      </DialogBoxProvider>
    </>
  )
}

export const LazyComponent = (props) => {
  let Comp = React.lazy(() => import("./" + props.folder + "/" + props.page))
  return (
    <Comp {...props} />
  )
}

export default PrivateAppShell;