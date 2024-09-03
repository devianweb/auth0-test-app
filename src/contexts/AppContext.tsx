import React from "react";

type AppContextType = {
  domain: string,
  clientId: string,
  redirectUri: string
}

const defaultContext: AppContextType = {
  domain: "",
  clientId: "",
  redirectUri: ""
}

const AppContext = React.createContext<AppContextType>(defaultContext);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppContext.Provider value={defaultContext}>
      {children}
    </AppContext.Provider>
  )
}

export {AppContext, AppContextProvider};
