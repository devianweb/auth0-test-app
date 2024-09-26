import React, {useState} from "react";


type AppContextType = {
  domain: string;
  setDomain: React.Dispatch<React.SetStateAction<string>>;
  clientId: string;
  setClientId: React.Dispatch<React.SetStateAction<string>>;
  redirectUri: string;
  setRedirectUri: React.Dispatch<React.SetStateAction<string>>;
  logoutUrl: string;
  setLogoutUrl: React.Dispatch<React.SetStateAction<string>>;
  audience: string;
  setAudience: React.Dispatch<React.SetStateAction<string>>;
  scope: string;
  setScope: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContext: AppContextType = {
  domain: "",
  setDomain: () => {},
  clientId: "",
  setClientId: () => {},
  redirectUri: "",
  setRedirectUri: () => {},
  logoutUrl: "",
  setLogoutUrl: () => {},
  audience: "",
  setAudience: () => {},
  scope: "",
  setScope: () => {}
}

const AppContext = React.createContext<AppContextType>(defaultContext);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [domain, setDomain] = useState("");
  const [clientId, setClientId] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [logoutUrl, setLogoutUrl] = useState("");
  const [audience, setAudience] = useState("");
  const [scope, setScope] = useState("");


  return (
    <AppContext.Provider value={{
      domain: domain,
      setDomain: setDomain,
      clientId: clientId,
      setClientId: setClientId,
      redirectUri: redirectUri,
      setRedirectUri: setRedirectUri,
      logoutUrl: logoutUrl,
      setLogoutUrl: setLogoutUrl,
      audience: audience,
      setAudience: setAudience,
      scope: scope,
      setScope: setScope
    }}>
      {children}
    </AppContext.Provider>
  )
}

export {AppContext, AppContextProvider};
