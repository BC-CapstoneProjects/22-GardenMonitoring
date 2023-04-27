import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, state, increase, onClick }) => { // Add onClick prop here
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      m="0 30px"
      onClick={onClick} // Add this line to trigger the onClick prop
      style={{ cursor: "pointer" }} // Add this line to show pointer cursor on hover
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ color: 'black' }}
          >
            {increase}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle state={state} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Box>
          
        </Box>
        <Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;