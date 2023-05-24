import { Box, Button, IconButton, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import PlantDescriptions from "../../components/Plants/PlantDescriptions";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Subject from "../Subject/Subject";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ProgressCircle from "../../components/ProgressCircle";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import SidebarBarChart from "../../scenes/bar/index";


const Home = ({ setScans, setSelectedGarden }) => {


  return (
    <Box m="15px" paddingBottom="150px">
      
    </Box>
  );
};

export default Home;


