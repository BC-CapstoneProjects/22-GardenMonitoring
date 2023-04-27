import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  // Navigate to Sign
  const redirectToSign = () => {
    navigate("/");
  }

  // Navigate to NotificationPage
  const redirectToNotification = () => {
    navigate("/notifications");
  }

  // Navigate to SettingPage
  const redirectToSetting = () => {
    navigate("/settings");
  }

  // Navigate to AccountPage
  const redirectToAccount = () => {
    navigate("/account");
  }

  // State for the notification menu
  const [notificationClick, setNotificationClick] = useState(null);
  const handleNotificationClick = (event) => {
    setNotificationClick(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationClick(null);
  };

  // State for the person menu
  const [personClick, setpersonClick] = useState(null);
  const handlePersonClick = (event) => {
    setpersonClick(event.currentTarget);
  };
  const handlePersonClose = () => {
    setpersonClick(null);
  };

  // // State for the setting menu
  // const [settingClick, setSettingClick] = useState(null);
  // const handleSettingClick = (event) => {
  //   setSettingClick(event.currentTarget);
  // };
  // const handleSettingClose = () => {
  //   setSettingClick(null);
  // };


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {/* Notification */}
        <IconButton onClick={redirectToNotification}>
          <NotificationsOutlinedIcon />
        </IconButton>
        {/* <Menu
          anchorEl={notificationClick}
          open={Boolean(notificationClick)}
          onClose={handleNotificationClose}
          onClick={handleNotificationClose}
        >
          <MenuItem onClick={() => {redirectToNotification(); console.log("Notification clicked") } }>
            Notification1
          </MenuItem>
          <MenuItem onClick={() => {redirectToNotification(); console.log("Notification clicked") } }>
            Notification2
          </MenuItem>
        </Menu> */}

        {/* Setting */}
        <IconButton onClick={redirectToSetting}>
          <SettingsOutlinedIcon />
        </IconButton>


        <IconButton onClick={handlePersonClick}>
          <PersonOutlinedIcon  />
        </IconButton>
        <Menu
          anchorEl={personClick}
          open={Boolean(personClick)}
          onClose={handlePersonClose}
          onClick={handlePersonClose}
        >
          <MenuItem onClick={() => {redirectToSign(); console.log("Log out clicked")}  }>
            Log out
          </MenuItem>
          <MenuItem onClick={() => {redirectToAccount(); console.log("My account clicked") } }>
            My account
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
