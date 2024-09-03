import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {Button} from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
      await loginWithRedirect({
        audience: "https://api.ii.co.uk/enrolled",
        scope: "ii360:base"
      });
  }

  return <Button variant="contained" onClick={() => handleLogin()}>Log In</Button>;
};

export default LoginButton;