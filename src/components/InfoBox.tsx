import {useAuth0} from "@auth0/auth0-react";
import {Box, Divider} from "@mui/material";
import './InfoBox.css';
import {ReactElement, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";


const InfoBox = () => {
  const {isAuthenticated, user, getAccessTokenSilently} = useAuth0();
  const [token, setToken] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const printQueryParams = (): ReactElement => {
    return <Box>
      {queryParams.size === 0
        ? <></>
        : <>
          <h4 className="subtitle">query parameters</h4>
          <Divider className="divider"/>
          {Array.from(queryParams.entries()).map(([key, value]) => (
            <p key={key} style={{paddingLeft: "10px"}}>"{key}": "{value}"</p>
          ))}
        </>
      }
    </Box>
  }

  const getUserEntries = (): ReactElement => {
    const entries = user !== undefined ? Object.entries(user) : [];
    return <>
      {entries.map((entry) => {
        return <p key={entry[0]}>{entry[0]}: {entry[1]}</p>;
      })}
    </>;
  }

  const printToken = (): ReactElement => {
    return isAuthenticated
      ? <>
        <h4 className="subtitle">token</h4>
        <Divider className="divider"/>
        <p>{token}</p>
      </>
      : <></>;
  }

  useEffect(() => {
    if (isAuthenticated) {
      const value = async () => {
        const data = await getAccessTokenSilently();
        setToken(data);
      };
      value().catch(console.error);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  //user logging
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  //token logging
  // useEffect(() => {
  //   console.log("token: " + token);
  // }, [token]);

  return (
    <Box sx={{
      px: 2,
      border: '1px solid rgb(200, 200, 200)',
      borderRadius: '5px'
    }}>
      <h4 className="subtitle">auth0 state</h4>
      <Divider className="divider"/>
      <p>isAuthenticated: {isAuthenticated ? "true" : "false"}</p>
      {getUserEntries()}
      {printQueryParams()}
      {printToken()}
    </Box>

  );
};

export default InfoBox;