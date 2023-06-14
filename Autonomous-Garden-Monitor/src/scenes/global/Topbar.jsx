import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
import "./notification_counter.css";
import { listGardenDatabases } from "../../graphql/queries.js";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Auth } from 'aws-amplify';
// import React, { useState } from 'react';

const Topbar = () => {
  // var [unreadNotificationCount, setUnreadNotificationCount] = useState(3);
  var [notifications, setNotifications] = useState(
    /** @type {{Label,Garden_id,read:boolean,Diseased}[]} */ ([])
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchnotifications();
  }, []);

  const fetchnotifications = async () => {
    try {
      const nData = await API.graphql(graphqlOperation(listGardenDatabases));
      const nList = nData.data.listGardenDatabases.items;
      console.log("notification list", nList);
      setNotifications(nList);

      // var counter = 0;
      // for (let i = 0; i < notifications.length; i++) {
      //   if (notifications[i].Diseased == "true") {
      //     counter++;
      //   }
      // }
      // handleNotificationCount(counter);
    } catch (error) {
      console.log("error on fetching notifications", error);
      // handleNotificationCount(8);
    }
  };

  // Navigate to Sign
  const redirectToSign = () => {
    Auth.signOut()
      .then( ()=> {
        console.log("Successfully signed out");
        navigate("/");
      })
      .catch( (error) => {
          console.log("Error signing out: ", error);
      } ) 
  }

  const redirectTo = (info) => {
    navigate("/" + info);
  };
  // Navigate to NotificationPage
  const redirectToNotification = () => {
    navigate("/notifications");
  };

  // Navigate to SettingPage
  const redirectToSetting = () => {
    navigate("/settings");
  };

  // Navigate to AccountPage
  const redirectToAccount = () => {
    navigate("/account");
  };

  // State for the notification menu
  const [notificationClick, setNotificationClick] = useState(null);
  const handleNotificationClick = (event) => {
    setNotificationClick(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationClick(null);
  };

  const handleNotificationCount = (val) => {
    // setUnreadNotificationCount(val);
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

  const [notificationDataList, setNotificationData] = useState(
    /** @type {{Label,Garden_id,read:booolean,Diseased}[]}*/ ([])
  );

  useEffect(() => {
    fetch(
      "https://5yw0zfj7g7.execute-api.us-west-2.amazonaws.com/tedo/Notification?Garden_id=4"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result); // add this line to inspect the structure of the data
        setNotificationData(result.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error); // log errors to the console
      });
  }, []);

  const dismissNotification = (notification) => {
    notification.read = true;
    setNotifications((ns) =>
      ns.map((n) => (n.Garden_id === notification.Garden_id ? notification : n))
    );
  };

  const getUnreadNotifications = (_notifications = notificationDataList) =>
    _notifications.filter((n) => !n?.read);

  const unreadNotificationCount = getUnreadNotifications().length;

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

        <IconButton onClick={handleNotificationClick}>
          <NotificationsOutlinedIcon />
          <Box className={unreadNotificationCount > 0 ? "counter" : "clear"} color='white'>
            {unreadNotificationCount}
          </Box>
        </IconButton>

        <Menu
          anchorEl={notificationClick}
          open={Boolean(notificationClick)}
          onClose={handleNotificationClose}
          onClick={handleNotificationClose}
        >
          {/*create a loop for notifications get their label and mark them in the database we will add which plant will be affected 
           from there we can redirect the user from the notification to the detailed view of the information from the database */}
          <MenuItem
            onClick={() => {
              redirectTo("bar");
              console.log("Log out clicked");
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              classNaame="col content"
            ></Box>
          </MenuItem>
          {getUnreadNotifications().map((n) => (
            <MenuItem
              onClick={() => dismissNotification(n)}
              sx={{ display: "flex", gap: 2 }}
            >
              <span key={n.message}>{n.Label}</span> <Button>X</Button>
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => {
              redirectTo("bar");
              console.log("Log out clicked");
            }}
          >
            {/* Brown Streak */}
          </MenuItem>
          <MenuItem
            onClick={() => {
              redirectTo("bar");
              console.log("Log out clicked");
            }}
          >
            {/* Brown Streak Disease */}
          </MenuItem>
        </Menu>
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
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={personClick}
          open={Boolean(personClick)}
          onClose={handlePersonClose}
          onClick={handlePersonClose}
        >
          <MenuItem
            onClick={() => {
              redirectToSign();
              console.log("Log out clicked");
            }}
          >
            Log out
          </MenuItem>
          <MenuItem
            onClick={() => {
              redirectToAccount();
              console.log("My account clicked");
            }}
          >
            My account
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
