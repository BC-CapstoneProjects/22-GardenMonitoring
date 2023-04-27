import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import SpaIcon from '@mui/icons-material/Spa';

const ProgressCircle = ({ progress = "0.75", size = "40", state = "success" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  let circleColor;    
  if (state === "success") {
    circleColor ="#4caf50"
  } else if (state === "warning") {
    circleColor = "#ffc107" 
  } else if (state === "error") {
    circleColor = "#f44336"
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%), ${circleColor}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <SpaIcon sx={{ fontSize: '26px', color: `${circleColor}` }} />
      </Box>
      <Typography variant="h5" sx={{color: state === "success"
                ? "#4caf50"
                : state === "warning"
                ? "#ffc107"
                : "#f44336" }}>
          {state}
        </Typography>
    </Box>
  );
};

export default ProgressCircle;
