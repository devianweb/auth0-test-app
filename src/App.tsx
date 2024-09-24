import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Grid from '@mui/material/Grid2';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import InfoBox from "./components/InfoBox";
import {useLocation} from "react-router-dom";
import {Box, Button, Container, TextField} from "@mui/material";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import {AppContext} from "./contexts/AppContext";
import TokenButton from "./components/TokenButton";

function App() {

  const {isAuthenticated} = useAuth0();
  const location = useLocation();
  const {domain, setDomain, clientId, setClientId, redirectUri, setRedirectUri, logoutUrl, setLogoutUrl} = useContext(AppContext);

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

  const [token, setToken] = useState("");

  const auth0ProviderKey = `${domain}-${clientId}-${redirectUri}`;

  useEffect(() => {
    setErrorDomain(tempDomain === null || tempDomain.trim().length === 0);
    setErrorClientId(tempClientId === null || tempClientId.trim().length === 0);
    setErrorRedirectUri(tempRedirectUri === null || tempRedirectUri.trim().length === 0);
    setErrorLogoutUrl(tempLogoutUrl === null || tempLogoutUrl.trim().length === 0);
  }, [tempDomain, tempClientId, tempRedirectUri, tempLogoutUrl]);

  const checkContextError = () => {
    console.log("domain check: " + domain === null || domain.trim().length === 0)
    console.log("clientId check: " + clientId === null || clientId.trim().length === 0)
    console.log("redirectUri check: " + redirectUri === null || redirectUri.trim().length === 0)
    console.log("logoutUrl check: " + logoutUrl === null || logoutUrl.trim().length === 0)
    return (domain === null || domain.trim().length === 0)
      || (clientId === null || clientId.trim().length === 0)
      || (redirectUri === null || redirectUri.trim().length === 0)
      || (logoutUrl === null || logoutUrl.trim().length === 0);
  }

  //error logging
  useEffect(() => {
    console.log("error: " + error);
  }, [error]);

  //context logging
  useEffect(() => {
    console.log("domain: " + domain);
    console.log("clientId: " + clientId);
    console.log("redirectUri: " + redirectUri);
    console.log("logoutUrl: " + logoutUrl);
  }, [domain, clientId, redirectUri, logoutUrl]);

  //checks for context errors
  useEffect(() => {
    if (checkContextError()) {
      console.log("setting error to true");
      setError(true);
    } else {
      setError(false);
    }
  }, [editing, domain, clientId, redirectUri, logoutUrl]);

  const handleSave = () => {
    setDomain(tempDomain);
    setClientId(tempClientId);
    setRedirectUri(tempRedirectUri);
    setLogoutUrl(tempLogoutUrl)

    //do I need this check?
    if (tempDomain && tempClientId && tempRedirectUri && tempLogoutUrl) {
      setEditing(false);
    }
  }

  const handleCancel = () => {
    setEditing(false)
    setTempDomain(domain);
    setTempClientId(clientId);
    setTempRedirectUri(redirectUri);
    setTempLogoutUrl(logoutUrl);
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleChange = (
    setTempDomain: (value: React.SetStateAction<string>) => void,
    setTempDomainError: (value: React.SetStateAction<boolean>) => void,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTempDomain(event.target.value);
    event.target.value ? setTempDomainError(false) : setTempDomainError(true);
  }

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
                <Button variant="contained" onClick={handleSave} disabled={errorDomain || errorClientId || errorRedirectUri}>save</Button>
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
            <LoginButton isDisabled={editing || error}/>
            <LogoutButton isDisabled={editing || error} logoutUrl={logoutUrl}/>
            <TokenButton isDisabled={false} setToken={setToken}/>
          </Grid>
          <Grid size={12}>
            <InfoBox location={location}/>
            <p>token: {token}</p>
          </Grid>
        </Auth0Provider>
      </Grid>
    </Container>
  );
}

export default App;
