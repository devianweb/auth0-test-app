import {useAuth0} from "@auth0/auth0-react";
import React, {useContext} from "react";
import {Button} from "@mui/material";
import {AppContext} from "../contexts/AppContext";

const LoginButton = ({isDisabled}: { isDisabled: boolean }) => {
  const {loginWithRedirect, logout, isAuthenticated} = useAuth0();
  const {logoutUrl} = useContext(AppContext);

  const handleLogin = async () => {
    loginWithRedirect({
        authorizationParams: {prompt: "login"}
      });
  }

  return <Button disabled={isAuthenticated|| isDisabled} variant="contained" onClick={() => handleLogin()}>Log In</Button>;
};

export default LoginButton;