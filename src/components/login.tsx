import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import {Button} from "@mui/material";

const LoginButton = ({isDisabled}: { isDisabled: boolean }) => {
  const {loginWithRedirect, isAuthenticated} = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({});
  }

  return <Button disabled={isAuthenticated|| isDisabled} variant="contained" onClick={() => handleLogin()}>Log In</Button>;
};

export default LoginButton;