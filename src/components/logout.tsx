import {useAuth0} from "@auth0/auth0-react";
import React, {useContext} from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {AppContext} from "../contexts/AppContext";

const LogoutButton = ({isDisabled}: { isDisabled: boolean }) => {
  const {logout, isAuthenticated} = useAuth0();
  const {logoutUrl} = useContext(AppContext);

  return (
    <Button disabled={!isAuthenticated || isDisabled} variant="contained" onClick={() => logout({logoutParams: {returnTo: logoutUrl}})}>
      Log Out
    </Button>
  );
};

export default LogoutButton;