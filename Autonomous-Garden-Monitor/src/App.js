import Garden from "./routes/Garden/Garden";
import Settings from "./routes/Settings";
import Account from "./routes/Settings/Account";
import Notifications from "./routes/Settings/Notifications";
import Sign from './routes/Sign'
// import "./index.css";
import '@aws-amplify/ui-react/styles.css';

//min
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";


// AWS Cognito
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import { Amplify }  from 'aws-amplify';
import { Auth } from 'aws-amplify';

Amplify.configure(awsconfig)

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isSignPage = location.pathname === "/";

  // Add useState hook for selectedGarden
  const [selectedGarden, setSelectedGarden] = useState(localStorage.getItem('selectedGarden') || "Select Garden");
  // Add useEffect hook to update localStorage when selectedGarden changes
  useEffect(() => {
    localStorage.setItem('selectedGarden', selectedGarden);
  }, [selectedGarden]);

  // get most recent drone scan data from api for every id in PlantDescriptions
  const [scans, setScans] = useState([]);

  

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isSignPage && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isSignPage && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route
                path="/garden"
                element={<Garden setScans={setScans} setSelectedGarden={setSelectedGarden} />}
              />
              <Route
                path="/view/:subjectID"
                element={<Garden setScans={setScans} setSelectedGarden={setSelectedGarden} />}
              />
              {/* <Route path="/" element={<Sign />} /> */}
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar data={scans} selectedGarden={selectedGarden} />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              {/* <Route path="/garden" element={<Garden />} />
              <Route path="/view/:subjectID" element={<Garden />} /> */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Account />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default withAuthenticator(App);