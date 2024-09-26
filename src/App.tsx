import React, {useCallback, useContext, useEffect, useState} from 'react';
import './App.css';
import Grid from '@mui/material/Grid2';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import InfoBox from "./components/InfoBox";
import {useLocation} from "react-router-dom";
import {Box, Button, Container, TextField} from "@mui/material";
import {Auth0Provider} from "@auth0/auth0-react";
import {AppContext} from "./contexts/AppContext";

function App() {

  const location = useLocation();
  const {domain, setDomain, clientId, setClientId, redirectUri, setRedirectUri, logoutUrl, setLogoutUrl} = useContext(AppContext);

  const [contextPopulated, setContextPopulated] = useState(false);

  const [tempDomain, setTempDomain] = useState(domain);
  const [errorDomain, setErrorDomain] = useState(false);

  const [tempClientId, setTempClientId] = useState(clientId);
  const [errorClientId, setErrorClientId] = useState(false);

  const [tempRedirectUri, setTempRedirectUri] = useState(redirectUri);
  const [errorRedirectUri, setErrorRedirectUri] = useState(false);

  const [tempLogoutUrl, setTempLogoutUrl] = useState(redirectUri);
  const [errorLogoutUrl, setErrorLogoutUrl] = useState(false);

  const [editing, setEditing] = useState(true);
  const [error, setError] = useState(true);

  const auth0ProviderKey = `${domain}-${clientId}-${redirectUri}`;

  const isEmpty = (value: string): boolean => {
    return value === null || value.trim().length === 0
  }

  const handleSave = (): void => {
    setDomain(tempDomain);
    localStorage.setItem("domain", tempDomain)
    setClientId(tempClientId);
    localStorage.setItem("clientId", tempClientId)
    setRedirectUri(tempRedirectUri);
    localStorage.setItem("redirectUri", tempRedirectUri)
    setLogoutUrl(tempLogoutUrl)
    localStorage.setItem("logoutUrl", tempLogoutUrl)
    if (!errorDomain && !errorClientId && !errorRedirectUri && !errorLogoutUrl) {
      setEditing(false);
    }
  }

  const handleCancel = (): void => {
    setEditing(false)
    setTempDomain(domain);
    setTempClientId(clientId);
    setTempRedirectUri(redirectUri);
    setTempLogoutUrl(logoutUrl);
  }

  const handleEdit = (): void => {
    setEditing(true)
  }

  const handleChange = (
    setTempValue: (value: React.SetStateAction<string>) => void,
    setTempValueError: (value: React.SetStateAction<boolean>) => void,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setTempValue(event.target.value);
    event.target.value ? setTempValueError(false) : setTempValueError(true);
  }

  const populateValueFromContext = (
    setContext: (value: React.SetStateAction<string>) => void,
    name: string
  ): void => {
    const value = localStorage.getItem(name);
    if (value) {
      console.log(`setting ${name}...`)
      setContext(value);
    } else {
      console.log(`no value found for ${name}`)
    }
  }

  const checkContextErrors = useCallback((): boolean => {
    return (domain === null || domain.trim().length === 0)
      || (clientId === null || clientId.trim().length === 0)
      || (redirectUri === null || redirectUri.trim().length === 0)
      || (logoutUrl === null || logoutUrl.trim().length === 0);
  }, [domain, clientId, redirectUri, logoutUrl])

  const checkFieldErrors = useCallback((): boolean => {
    return errorDomain || errorClientId || errorRedirectUri || errorLogoutUrl;
  }, [errorDomain, errorClientId, errorRedirectUri, errorLogoutUrl])

  //on load, check local storage and populate fields
  useEffect(() => {
    console.log("Context being updated from local storage...");
    populateValueFromContext(setDomain, "domain");
    populateValueFromContext(setClientId, "clientId");
    populateValueFromContext(setRedirectUri, "redirectUri");
    populateValueFromContext(setLogoutUrl, "logoutUrl");
  }, [setDomain, setClientId, setRedirectUri, setLogoutUrl]);

  useEffect(() => {
    setContextPopulated(!checkContextErrors())
  }, [checkContextErrors]);

  useEffect(() => {
    if (contextPopulated) setEditing(false);
  }, [contextPopulated]);

  //if domain updates, update temp values if domain isn't empty
  useEffect(() => {
    if (!isEmpty(domain)) setTempDomain(domain);
    if (!isEmpty(clientId)) setTempClientId(clientId);
    if (!isEmpty(redirectUri)) setTempRedirectUri(redirectUri);
    if (!isEmpty(logoutUrl)) setTempLogoutUrl(logoutUrl);
  }, [domain, clientId, redirectUri, logoutUrl]);

  //field validation errors
  useEffect(() => {
    setErrorDomain(isEmpty(tempDomain));
    setErrorClientId(isEmpty(tempClientId));
    setErrorRedirectUri(isEmpty(tempRedirectUri));
    setErrorLogoutUrl(isEmpty(tempLogoutUrl));
  }, [tempDomain, tempClientId, tempRedirectUri, tempLogoutUrl]);

  //overall error state
  useEffect(() => {
    if (checkFieldErrors()) {
      setError(true);
    } else {
      setError(false);
    }
  }, [checkFieldErrors]);

  //checks for context errors
  useEffect(() => {
    if (checkContextErrors()) {
      console.log("setting error to true");
      setError(true);
    } else {
      setError(false);
    }
  }, [checkContextErrors]);


  // state logging
  // useEffect(() => {
  //   console.log("editing: " + editing);
  //   console.log("error: " + error);
  //   console.log("contextPopulated: " + contextPopulated);
  // }, [error, editing, contextPopulated]);

  // context logging
  // useEffect(() => {
  //   console.log("domain: " + domain);
  //   console.log("clientId: " + clientId);
  //   console.log("redirectUri: " + redirectUri);
  //   console.log("logoutUrl: " + logoutUrl);
  // }, [domain, clientId, redirectUri, logoutUrl]);

  return (
    <Container sx={{
      paddingY: "50px"
    }}>
      <Grid container spacing={2}>
        <Grid
          size={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <TextField label="domain" helperText={errorDomain ? "cannot be empty" : ""} value={editing ? tempDomain : domain} fullWidth disabled={!editing} error={errorDomain}
                     onChange={(event) => handleChange(setTempDomain, setErrorDomain, event)}/>
          <TextField label="clientId" helperText={errorClientId ? "cannot be empty" : ""} value={editing ? tempClientId : clientId} fullWidth disabled={!editing} error={errorClientId}
                     onChange={(event) => handleChange(setTempClientId, setErrorClientId, event)}/>
          <TextField label="callbackUrl" helperText={errorRedirectUri ? "cannot be empty" : ""} value={editing ? tempRedirectUri : redirectUri} fullWidth disabled={!editing}
                     error={errorRedirectUri} onChange={(event) => handleChange(setTempRedirectUri, setErrorRedirectUri, event)}/>
          <TextField label="logoutUrl" helperText={errorLogoutUrl ? "cannot be empty" : ""} value={editing ? tempLogoutUrl : logoutUrl} fullWidth disabled={!editing}
                     error={errorLogoutUrl} onChange={(event) => handleChange(setTempLogoutUrl, setErrorLogoutUrl, event)}/>
          {
            editing
              ? <Box sx={{display: "flex", gap: "10px", alignSelf: "end"}}>
                <Button variant="contained" onClick={handleSave} disabled={error}>save</Button>
                <Button variant="contained" sx={{alignSelf: "end"}} onClick={handleCancel} disabled={error}>cancel</Button>
              </Box>
              : <Button variant="contained" sx={{alignSelf: "end"}} onClick={handleEdit}>edit</Button>
          }
        </Grid>
        <Auth0Provider
          key={auth0ProviderKey}
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            audience: "https://api.ii.co.uk/enrolled",
            redirect_uri: redirectUri,
            scope: "ii360:base"
          }}
        >
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px"
            }}>
              <LogoutButton isDisabled={editing || error} logoutUrl={logoutUrl}/>
              <LoginButton isDisabled={editing || error}/>
          </Grid>
          <Grid size={12}>
            <InfoBox location={location}/>
          </Grid>
        </Auth0Provider>
      </Grid>
    </Container>
  );
}

export default App;
