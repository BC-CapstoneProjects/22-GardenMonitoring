import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const refreshPage = () => {
  window.location.reload();
};

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography  onClick={refreshPage} 
        variant="h2"
        color={"#43A047"}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {subtitle}
      </Typography>
      <Typography variant="h3" >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
