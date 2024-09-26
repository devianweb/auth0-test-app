import {useAuth0} from "@auth0/auth0-react";
import React, {useContext} from "react";
import {Button} from "@mui/material";
import {AppContext} from "../contexts/AppContext";

const LogoutButton = ({isDisabled}: { isDisabled: boolean }) => {
  const {logout, isAuthenticated} = useAuth0();
  const {logoutUrl} = useContext(AppContext);

  const handleLogout = (): void => {
    logout({logoutParams: {returnTo: logoutUrl}});
  }

  return (
    <Button disabled={!isAuthenticated || isDisabled} variant="contained" onClick={() => handleLogout()}>Log Out</Button>
  );
};

export default LogoutButton;