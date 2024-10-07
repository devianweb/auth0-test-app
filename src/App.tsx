import React, {useCallback, useContext, useEffect, useState} from 'react';
import './App.css';
import Grid from '@mui/material/Grid2';
import InfoBox from "./components/InfoBox";
import {Box, Button, Container, TextField} from "@mui/material";
import {Auth0Provider} from "@auth0/auth0-react";
import {AppContext} from "./contexts/AppContext";
import AuthButtons from "./components/AuthButtons";
import {isEmpty} from "./utils/Utils";
import ConfigField from "./components/ConfigField";

function App() {

  const {domain, setDomain, clientId, setClientId, redirectUri, setRedirectUri, logoutUrl, setLogoutUrl, audience, setAudience, scope, setScope} = useContext(AppContext);

  const [contextPopulated, setContextPopulated] = useState(false);

  const [tempDomain, setTempDomain] = useState(domain);
  const [errorDomain, setErrorDomain] = useState(false);

  const [tempClientId, setTempClientId] = useState(clientId);
  const [errorClientId, setErrorClientId] = useState(false);

  const [tempRedirectUri, setTempRedirectUri] = useState(redirectUri);
  const [errorRedirectUri, setErrorRedirectUri] = useState(false);

  const [tempLogoutUrl, setTempLogoutUrl] = useState(redirectUri);
  const [errorLogoutUrl, setErrorLogoutUrl] = useState(false);

  const [tempAudience, setTempAudience] = useState(audience);
  const [errorAudience, setErrorAudience] = useState(false);

  const [tempScope, setTempScope] = useState(scope);
  const [errorScope, setErrorScope] = useState(false);

  const [editing, setEditing] = useState(true);
  const [error, setError] = useState(true);

  const auth0ProviderKey = `${domain}-${clientId}-${redirectUri}-${logoutUrl}-${audience}-${scope}`;

  const handleSave = (): void => {
    setDomain(tempDomain);
    localStorage.setItem("domain", tempDomain);
    setClientId(tempClientId);
    localStorage.setItem("clientId", tempClientId);
    setRedirectUri(tempRedirectUri);
    localStorage.setItem("redirectUri", tempRedirectUri);
    setLogoutUrl(tempLogoutUrl);
    localStorage.setItem("logoutUrl", tempLogoutUrl);
    setAudience(tempAudience);
    localStorage.setItem("audience", tempAudience);
    setAudience(tempAudience);
    localStorage.setItem("scope", tempScope);
    setScope(tempScope);
    if (!checkFieldErrors()) {
      setEditing(false);
    }
  }

  const handleCancel = (): void => {
    setEditing(false)
    setTempDomain(domain);
    setTempClientId(clientId);
    setTempRedirectUri(redirectUri);
    setTempLogoutUrl(logoutUrl);
    setTempAudience(audience);
    setTempScope(scope);
  }

  const handleEdit = (): void => {
    setEditing(true)
  }

  const populateValueFromContext = (
    setContext: (value: React.SetStateAction<string>) => void,
    name: string
  ): void => {
    const value = localStorage.getItem(name);
    if (value) setContext(value);
  }

  const checkContextErrors = useCallback((): boolean => {
    return (domain === null || domain.trim().length === 0)
      || (clientId === null || clientId.trim().length === 0)
      || (redirectUri === null || redirectUri.trim().length === 0)
      || (logoutUrl === null || logoutUrl.trim().length === 0)
      || (audience === null || audience.trim().length === 0)
      || (scope === null || scope.trim().length === 0);
  }, [domain, clientId, redirectUri, logoutUrl, audience, scope])

  const checkFieldErrors = useCallback((): boolean => {
    return errorDomain || errorClientId || errorRedirectUri || errorLogoutUrl || errorAudience || errorScope;
  }, [errorDomain, errorClientId, errorRedirectUri, errorLogoutUrl, errorAudience, errorScope])

  //on load, check local storage and populate fields
  useEffect(() => {
    populateValueFromContext(setDomain, "domain");
    populateValueFromContext(setClientId, "clientId");
    populateValueFromContext(setRedirectUri, "redirectUri");
    populateValueFromContext(setLogoutUrl, "logoutUrl");
    populateValueFromContext(setAudience, "audience");
    populateValueFromContext(setScope, "scope");
  }, [setDomain, setClientId, setRedirectUri, setLogoutUrl, setAudience, setScope]);

  //check if context is populated
  useEffect(() => {
    setContextPopulated(!checkContextErrors())
  }, [checkContextErrors]);

  //if context is populated, set editing to false
  useEffect(() => {
    if (contextPopulated) setEditing(false);
  }, [contextPopulated]);

  //if domain updates, update temp values if domain isn't empty
  useEffect(() => {
    if (!isEmpty(domain)) setTempDomain(domain);
    if (!isEmpty(clientId)) setTempClientId(clientId);
    if (!isEmpty(redirectUri)) setTempRedirectUri(redirectUri);
    if (!isEmpty(logoutUrl)) setTempLogoutUrl(logoutUrl);
    if (!isEmpty(audience)) setTempAudience(audience);
    if (!isEmpty(scope)) setTempScope(scope);
  }, [domain, clientId, redirectUri, logoutUrl, audience, scope]);

  //field validation errors
  useEffect(() => {
    setErrorDomain(isEmpty(tempDomain));
    setErrorClientId(isEmpty(tempClientId));
    setErrorRedirectUri(isEmpty(tempRedirectUri));
    setErrorLogoutUrl(isEmpty(tempLogoutUrl));
    setErrorAudience(isEmpty(tempAudience));
    setErrorScope(isEmpty(tempScope));
  }, [tempDomain, tempClientId, tempRedirectUri, tempLogoutUrl, tempAudience, tempScope]);

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
  //   console.log("temp clientId: " + tempClientId);
  //
  //   console.log("redirectUri: " + redirectUri);
  //   console.log("temp redirectUri: " + tempRedirectUri);
  //
  //   console.log("logoutUrl: " + logoutUrl);
  //   console.log("temp logoutUrl: " + tempLogoutUrl);
  //
  //   console.log("audience: " + audience);
  //   console.log("temp audience: " + tempAudience);
  //
  //   console.log("scope: " + scope);
  //   console.log("temp scope: " + tempScope);
  //
  // }, [domain, clientId, redirectUri, logoutUrl, audience, scope, tempAudience, tempScope]);

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
          <ConfigField label={"domain"} editing={editing} value={domain} tempValue={tempDomain} setTempValue={setTempDomain} tempValueError={errorDomain} setTempValueError={setErrorDomain} />
          <ConfigField label={"clientId"} editing={editing} value={clientId} tempValue={tempClientId} setTempValue={setTempClientId} tempValueError={errorClientId} setTempValueError={setErrorClientId} />
          <ConfigField label={"callbackUrl"} editing={editing} value={redirectUri} tempValue={tempRedirectUri} setTempValue={setTempRedirectUri} tempValueError={errorRedirectUri} setTempValueError={setErrorRedirectUri} />
          <ConfigField label={"logoutUrl"} editing={editing} value={logoutUrl} tempValue={tempLogoutUrl} setTempValue={setTempLogoutUrl} tempValueError={errorLogoutUrl} setTempValueError={setErrorLogoutUrl} />
          <ConfigField label={"audience"} editing={editing} value={audience} tempValue={tempAudience} setTempValue={setTempAudience} tempValueError={errorAudience} setTempValueError={setErrorAudience} />
          <ConfigField label={"scope"} editing={editing} value={scope} tempValue={tempScope} setTempValue={setTempScope} tempValueError={errorScope} setTempValueError={setErrorScope} />
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
            audience: audience,
            redirect_uri: redirectUri,
            scope: scope
          }}
        >
          <AuthButtons isError={error} isEditing={editing}/>
          <Grid size={12}>
            <InfoBox/>
          </Grid>
        </Auth0Provider>
      </Grid>
    </Container>
  );
}

export default App;
