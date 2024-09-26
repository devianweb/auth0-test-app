import LogoutButton from "./logout";
import LoginButton from "./login";
import Grid from "@mui/material/Grid2";
import React from "react";

const AuthButtons = ({isEditing, isError}: {isEditing: boolean, isError: boolean}) => {
  return <Grid
    size={12}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px"
    }}>
    <LogoutButton isDisabled={isEditing || isError}/>
    <LoginButton isDisabled={isEditing || isError}/>
  </Grid>
}

export default AuthButtons;