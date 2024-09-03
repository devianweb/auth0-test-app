import {useAuth0} from "@auth0/auth0-react";
import {Box, Divider} from "@mui/material";
import './InfoBox.css';


const InfoBox = ({location}) => {
  const {isAuthenticated, user} = useAuth0();

  // Create a URLSearchParams object to work with query parameters
  const queryParams = new URLSearchParams(location.search);

  const printQueryParams = () => {
    return <Box>
      <p>{`{`}</p>
      {Array.from(queryParams.entries()).map(([key, value]) => (
        <p key={key} style={{paddingLeft: "10px"}}>"{key}": "{value}"</p>
      ))}
      <p>{`}`}</p>
    </Box>
  }

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