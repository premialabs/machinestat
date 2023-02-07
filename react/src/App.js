import { ProtectedRoute } from "./_core/components/index";
import { Routes, Route, Navigate} from "react-router-dom";
import { PrivateAppShell, PublicAppShell } from "./_core/components/index"
import base_routes from "./_core/base-routes"
import app_routes from "./app/routes"
import React, { Suspense, useRef, useContext } from 'react';
import NotFound from "./_core/screens/NotFound"
import AuthContext from "./_core/providers/AuthContext";

function App() {
  let _routes = [];
  let hasRootRef = useRef(false);
  let auth = useContext(AuthContext);

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {
            _routes.filter(route => route.isPrivate).map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute>
                      <PrivateLazyComponent page={route.page} folder={route.folder} />
                    </ProtectedRoute>
                  }
                />
              )
            })
          }
          {
            _routes.filter(route => !route.isPrivate).map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    (auth.isAuthed && route.path === "/login") ?
                      <Navigate to="/" replace />
                      :
                      <PublicLazyComponent page={route.page} folder={route.folder} />
                  }
                />
              )
            })
          }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export const PrivateLazyComponent = (props) => {
  let Comp = React.lazy(() => import("./" + props.folder + "/" + props.page))
  return (
    <PrivateAppShell>
      <Comp {...props} />
    </PrivateAppShell>
  )
}

export const PublicLazyComponent = (props) => {
  let Comp = React.lazy(() => import("./" + props.folder + "/" + props.page))
  return (
    <PublicAppShell>
      <Comp {...props} />
    </PublicAppShell>
  )
}

export default App;
