import { Box } from "@mui/material";
import Header from "../../components/Header";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import "./index.css";

const AgmPilot = () => {

    const handleClick = () => {
        const bucketName = "agm-pilot";
        const archiveName = "AGM-Pilot.zip";
        window.open(`http://localhost:9000/getArchive/${bucketName}/${archiveName}`);
        console.log("Downloading AGM-Pilot from S3");
      };

  return (
    <Box m="50px">
      <Header subtitle="AGM-Pilot" />
        <Box 
            component="img"
            sx={{ 
                height: 466,
                width: 700,
                padding: 0, 
                margin: -1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                boxShadow: 5, 
            }}
            src={`assets/gui.png`}
            alt={'AGM-Pilot GUI'}
        />
        <br></br>
            <Button 
                variant="contained" 
                endIcon={<ArrowDownwardIcon />}
                onClick={handleClick}>
                Download
            </Button>
            <Typography variant="h5" gutterBottom>
                *Requires Windows 11 64-bit
            </Typography>
    </Box>
  );
};

export default AgmPilot;
