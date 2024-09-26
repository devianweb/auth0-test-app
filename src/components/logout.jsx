import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid2";

const LogoutButton = ({isDisabled, logoutUrl}) => {
  const { logout, isAuthenticated } = useAuth0();

  return (
      <Button disabled={!isAuthenticated || isDisabled} variant="contained" onClick={() => logout({ logoutParams: { returnTo: logoutUrl } })}>
        Log Out
      </Button>
  );
};

export default LogoutButton;