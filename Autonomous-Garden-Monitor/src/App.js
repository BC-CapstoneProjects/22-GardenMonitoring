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
import { useNavigate } from "react-router-dom";


// AWS Cognito
import { Authenticator } from '@aws-amplify/ui-react';
import { View, Button, Text, Image, useTheme } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';

Amplify.configure(awsconfig)



// const services = {
//   handleSignUp : async (formData, navigate) => {
  

//     let { username, password, attributes } = formData;
//     // custom username
//     username = username.toLowerCase();
//     attributes.email = attributes.email.toLowerCase();
  
//     // phone_number validation
//     const phoneNumberRegex = /^\d{10}$/;
//     if (!phoneNumberRegex.test(attributes.phone_number)) {
//       alert("Phone Number format is incorrect. Please enter a 10-digit phone number.");
//       return false
//     }
//     else {
//       return Auth.signUp({
//         username,
//         password,
//         attributes,
//       });
//     }
//   }
// };


const components = {
  Header() {
    const { tokens } = useTheme();

    const handleClick = () => {
      window.open('https://www.bellevuecollege.edu/', '_blank');
    };

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Button onClick={handleClick}
        style={{ 
          backgroundImage: 'url(/assets/gardenBackground2.png)', 
          backgroundSize: 'cover', 
          opacity: 0.8,
          color: 'transparent' 
        }}>
        <Image
          alt="Sign up plant"
          src="/assets/signUpPlant3.png"
        />
        </Button>
        <Text onClick={handleClick}>
          Click Here to Sign Up!
        </Text>
        
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },

  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email or username',
    },
  },
    // preferred_username: {
    //   label: 'Password:',
    //   placeholder: 'Enter your Password:',
    //   isRequired: false,
    //   order: 2,
    // },
  
};


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
    <Authenticator hideSignUp={true} components={components} formFields= {formFields} >
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
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
    </Authenticator>
  );
}

export default App;