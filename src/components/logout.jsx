import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {Button} from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="contained" onClick={() => logout({ logoutParams: { returnTo: "http://localhost:9070/contents/login-auth0/index.html" } })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;