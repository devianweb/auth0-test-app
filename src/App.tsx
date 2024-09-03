import React, {useEffect, useState} from 'react';
import './App.css';
import Grid from '@mui/material/Grid2';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import InfoBox from "./components/InfoBox";
import {useLocation} from "react-router-dom";
import {Box, Button, Container, TextField} from "@mui/material";
import {Auth0Provider} from "@auth0/auth0-react";

function App() {

  const location = useLocation();

  const [domain, setDomain] = useState("onesite-dev.eu.auth0.com");
  const [tempDomain, setTempDomain] = useState("onesite-dev.eu.auth0.com");
  const [errorDomain, setErrorDomain] = useState(false);

  const [clientId, setClientId] = useState("");
  const [tempClientId, setTempClientId] = useState("");
  const [errorClientId, setErrorClientId] = useState(false);

  const [redirectUri, setRedirectUri] = useState("http://localhost:9070/contents/login-auth0/index.html");
  const [tempRedirectUri, setTempRedirectUri] = useState("http://localhost:9070/contents/login-auth0/index.html");
  const [errorRedirectUri, setErrorRedirectUri] = useState(false);

  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);

  const auth0ProviderKey = `${domain}-${clientId}-${redirectUri}`;

  useEffect(() => {
      setError(errorDomain || errorClientId || errorRedirectUri);
  }, [errorDomain, errorClientId, errorRedirectUri]);

  const handleSave = () => {
    setEditing(false)
    setDomain(tempDomain);
    setClientId(tempClientId);
    setRedirectUri(tempRedirectUri);
  }

  const handleCancel = () => {
    setEditing(false)
    setError(false)
    setErrorDomain(false);
    setErrorClientId(false);
    setErrorRedirectUri(false);
    setTempDomain(domain);
    setTempClientId(clientId);
    setTempRedirectUri(redirectUri);
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

    <Auth0Provider
      key={auth0ProviderKey}
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
    >
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
            <TextField label="domain" helperText={errorDomain ? "cannot be empty" : ""} value={editing ? tempDomain : domain} fullWidth disabled={!editing} error={errorDomain} onChange={(event) => handleChange(setTempDomain, setErrorDomain, event)}/>
            <TextField label="clientId" helperText={errorClientId ? "cannot be empty" : ""} value={editing ? tempClientId : clientId} fullWidth disabled={!editing} error={errorClientId} onChange={(event) => handleChange(setTempClientId, setErrorClientId, event)}/>
            <TextField label="redirectUri" helperText={errorRedirectUri ? "cannot be empty" : ""} value={redirectUri ? tempRedirectUri : domain} fullWidth disabled={!editing} error={errorRedirectUri} onChange={(event) => handleChange(setTempRedirectUri, setErrorRedirectUri, event)}/>
            {
              editing
                ? <Box sx={{display: "flex", gap: "10px", alignSelf: "end"}}>
                  <Button variant="contained" onClick={handleSave} disabled={error}>save</Button>
                  <Button variant="contained" sx={{alignSelf: "end"}} onClick={handleCancel}>cancel</Button>
                </Box>
                : <Button variant="contained" sx={{alignSelf: "end"}} onClick={handleEdit}>edit</Button>
            }
          </Grid>
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px"
            }}>
            <LoginButton/>
            <LogoutButton/>
          </Grid>
          <Grid size={12}>
            <InfoBox location={location}/>
          </Grid>
        </Grid>
      </Container>
    </Auth0Provider>
  );
}

export default App;
