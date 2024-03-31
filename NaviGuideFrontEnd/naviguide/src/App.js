import { useEffect } from 'react';
import {Tooltip,initTE} from "tw-elements";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginPage/LoginPage';
import RegisterForm from './Components/RegisterPage/RegisterPage';
import ProfilePage from './Components/Profile/ProfilePage';
import { AuthProvider } from './AuthContext';
import RatingUser from './Components/RatingUser/RatingUser';

const App = () => {

  useEffect(() => {
    initTE({ Tooltip });
  }, []);

  return (
    <Router>
      {/*Wrapped Routes with authprovider */}
      
        <Routes>

          <Route path="/login" element={<AuthProvider><LoginForm /></AuthProvider>} />
          
          //Register page does not need login states so its not include authprovider
          <Route path="/register" element={<RegisterForm />} />
          
          <Route path="/ProfilePage" element={<AuthProvider><ProfilePage/></AuthProvider>}/>

          <Route path="/ratingUser" element={<RatingUser />} />
        
        
        </Routes>
    </Router>
    
  
    
  );
};

export default App;
