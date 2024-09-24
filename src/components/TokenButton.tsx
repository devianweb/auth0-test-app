import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import React from "react";

const TokenButton = ({isDisabled, setToken}: {isDisabled: boolean, setToken: (value: React.SetStateAction<string>) => void}) => {
  const {getAccessTokenSilently} = useAuth0();

  const handleClick = async () => {
    const token = await getAccessTokenSilently();
    setToken(token);
  }

  return <Button disabled={isDisabled} onClick={() => handleClick()}>Get Token</Button>;
}

export default TokenButton;