// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginPage/LoginPage';
import RegisterForm from './Components/RegisterPage/RegisterPage';
import ProfilePage from './Components/Profile/ProfilePage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
