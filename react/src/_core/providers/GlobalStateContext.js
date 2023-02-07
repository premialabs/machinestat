import React, { useState } from 'react';

export const GlobalStateContext = React.createContext();

export const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState({})
  const [loadingSource, setLoadingSource] = useState()

  return (
    <GlobalStateContext.Provider
      value={{
        state: state,
        read: (section) => state[section],
        write: (section, val) => {
          setState(prev => ({ ...prev, [section]: val }));
        },
        writeObject: (obj) => {
          setState(obj);
        },
        loadingSource: loadingSource,
        setLoadingSource: (p) => setLoadingSource(p)
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export default GlobalStateContext;