import React, { useEffect, useState, useRef } from 'react';
import auth_api from '../api/auth_api';
import { decodeError } from '../utilities/exception-handler';
import { useNavigate, useLocation } from "react-router-dom";
import permission_api from '../api/permission_api';
import user_permission_api from '../api/user_permission_api';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isServerAvailable, setIsServerAvailable] = useState(false);
  const [isAuthWaiting, setIsAuthWaiting] = useState(true);
  const [isPingingServer, setIsPingingServer] = useState(true);
  const [user, setUser] = useState();
  const [permissions, setPermissions] = useState();
  const [userPermissions, setUserPermissions] = useState();
  const [grants, setGrants] = useState([]);
  const [authError, setAuthError] = useState("");
  const heartBeatHandleRef = useRef();

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const login = async (username, password) => {
    try {
      setIsAuthWaiting(true)
      setAuthError("");
      let res = await auth_api.login(username, password);
      let user_res = await auth_api.user();
      let perm_res = await permission_api.index();
      let user_perm_res = await user_permission_api.index();
      setUserPermissions(user_perm_res.data.data);
      setPermissions(perm_res.data.data);
      setUser(user_res.data)
      setIsAuthed(true)
      setAuthError("");
      navigate(from, { replace: true });
    } catch (err) {
      setAuthError(decodeError(err))
    } finally {
      setIsAuthWaiting(false)
    }
  }

  const register = async (username, name, email, password) => {
    try {
      setIsAuthWaiting(true)
      await auth_api.register(username, name, email, password);
      setAuthError("");
      navigate("/login");
    } catch (err) {
      setAuthError(decodeError(err))
    } finally {
      setIsAuthWaiting(false)
    }
  }

  const logout = async () => {
    try {
      setIsAuthWaiting(true)
      await auth_api.logout();
      setUser()
      setIsAuthed(false)
      setAuthError("");
      clearInterval(heartBeatHandleRef.current);
      navigate("/login");
    } catch (err) {
      setAuthError(decodeError(err).message)
    }
    finally {
      setIsAuthWaiting(false)
    }
  }

  const checkHeartBeat = async (location, auth_api) => {
    if ((typeof location.pathname !== 'undefined') && (location.pathname !== '/login')) {
      try {
        let res = await auth_api.userInquire();
      } catch (e) {
        setIsAuthed(false);
        navigate("/login");
      }
    }
  }

  const processGrants = () => {
    if (isAuthed) {
      if (Array.isArray(userPermissions)) {
        let _grants = userPermissions
          .map(item => {
            return `${item.method}:${item.endpoint}`
          })
        setGrants(_grants);
      }
    }
  }

  useEffect(() => {
    processGrants();
  }, [isAuthed, permissions])

  useEffect(() => {
    heartBeatHandleRef.current = setInterval(checkHeartBeat, 50000, location, auth_api);

    (async () => {
      try {
        setIsPingingServer(true)
        await auth_api.csrf()
        setIsPingingServer(false)
        setIsServerAvailable(true)
        setIsAuthWaiting(true)
        let res = await auth_api.user();
        let perm_res = await permission_api.index();
        let user_perm_res = await user_permission_api.index();
        setUserPermissions(user_perm_res.data.data);
        setPermissions(perm_res.data.data);
        setUser(res.data)
        setIsAuthed(true)
        setAuthError("");
        setIsAuthWaiting(false)
      } catch (err) {
        setIsAuthed(false)
        setAuthError(decodeError(err))
        setIsAuthWaiting(false)
        setIsPingingServer(false)
        navigate("/login");
      }
    })();
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isPingingServer: isPingingServer,
        isServerAvailable: isServerAvailable,
        isAuthWaiting: isAuthWaiting,
        authError: authError,
        isAuthed: isAuthed,
        user: user,
        permissions: permissions,
        grants: grants,
        register: (username, name, email, password) => register(username, name, email, password),
        login: (username, password) => login(username, password),
        logout: () => logout()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;