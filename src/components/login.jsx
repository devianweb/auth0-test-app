import {useAuth0} from "@auth0/auth0-react";
import React, {useState} from "react";
import {Button} from "@mui/material";

const LoginButton = ({isDisabled}) => {
  const {loginWithPopup} = useAuth0();

  const handleLogin = async () => {
    await loginWithPopup({
      audience: "https://api.ii.co.uk/enrolled",
      scope: "ii360:base"
    });
  }

  return <Button disabled={isDisabled} variant="contained" onClick={() => handleLogin()}>Log In</Button>;
};

export default LoginButton;