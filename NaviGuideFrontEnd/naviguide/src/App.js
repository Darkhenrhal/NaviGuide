import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginPage/LoginPage';
import RegisterForm from './Components/RegisterPage/RegisterPage';
import ProfilePage from './Components/ProfileDashboard/ProfileDashboard';
import { AuthProvider } from './AuthContext';
import { Datepicker, Input, initTE } from "tw-elements";
import Search from './Components/Search/Search';
import ProfileView from './Components/ProfileView/ProfileView';
initTE({ Datepicker, Input }, { allowReinits: true });

const App = () => {
  return (
    <Router>
      {/*Wrapped Routes with authprovider */}
      
        <Routes>

          <Route path="/login" element={<AuthProvider><LoginForm /></AuthProvider>} />
          
          <Route path="/register" element={<RegisterForm />} />
          
          <Route path="/profile" element={<AuthProvider><profilePage/></AuthProvider>}/>

          <Route path="/search" element={<Search/>}/>

          <Route path="/profileview" element={<AuthProvider><ProfileView/></AuthProvider>}/>

          <Route path="/profileview/:userName" element={<AuthProvider><ProfileView/></AuthProvider>}/>

        
        </Routes>
    </Router>
  );
};

export default App;
