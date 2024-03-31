import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginPage/LoginPage';
import RegisterForm from './Components/RegisterPage/RegisterPage';
import ProfilePage from './Components/ProfileDashboard/ProfileDashboard';
import { AuthProvider } from './AuthContext';
import Search from './Components/Search/Search';
import ProfileView from './Components/ProfileView/ProfileView';
import RateUser from './Components/RateUser/RateUser';

const App = () => {
  return (
    <Router>
      {/*Wrapped Routes with authprovider */}
      
        <Routes>

          <Route path="/login" element={<AuthProvider><LoginForm /></AuthProvider>} />
          
          <Route path="/register" element={<RegisterForm />} />
          
          <Route path="/search" element={<Search/>}/>

          <Route path="/profile" element={<AuthProvider><ProfileView/></AuthProvider>}/>

          <Route path="/profile/:userName" element={<AuthProvider><ProfileView/></AuthProvider>}/>

          <Route path="/rate" element={<RateUser/>}/>

        
        </Routes>
    </Router>
  );
};

export default App;
