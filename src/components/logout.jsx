import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {Button} from "@mui/material";

const LogoutButton = ({isDisabled, logoutUrl}) => {
  const { logout } = useAuth0();

  return (
    <Button disabled={isDisabled} variant="contained" onClick={() => logout({ logoutParams: { returnTo: logoutUrl } })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;