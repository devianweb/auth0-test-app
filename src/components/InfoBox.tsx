import {useAuth0} from "@auth0/auth0-react";
import {Box, Divider} from "@mui/material";
import './InfoBox.css';
import {useEffect, useState} from "react";


const InfoBox = (location: any) => {
  const {isAuthenticated, user, getAccessTokenSilently} = useAuth0();
  const [token, setToken] = useState("");

  // Create a URLSearchParams object to work with query parameters
  const queryParams = new URLSearchParams(location);

  const printQueryParams = () => {
    return <Box>
      <p>{`{`}</p>
      {Array.from(queryParams.entries()).map(([key, value]) => (
        <p key={key} style={{paddingLeft: "10px"}}>"{key}": "{value}"</p>
      ))}
      <p>{`}`}</p>
    </Box>
  }

  useEffect(() => {
    if (isAuthenticated) {
      const value = async () => {
        const data = await getAccessTokenSilently();
        setToken(data);
      };
      value().catch(console.error);
    }
  }, [isAuthenticated]);

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
      <Box sx={{
        display: "flex",
        flexDirection: "column"
      }}>
        <p>isAuthenticated: {isAuthenticated ? "true" : "false"}</p>
        <p>user email: {user ? user.email : "no email to display"}</p>
      </Box>
      <h4 className="subtitle">query parameters</h4>
      <Divider className="divider"/>
      {queryParams.size === 0 ? <p>nothing to display</p> : printQueryParams()}
    </Box>

  );
};

export default InfoBox;