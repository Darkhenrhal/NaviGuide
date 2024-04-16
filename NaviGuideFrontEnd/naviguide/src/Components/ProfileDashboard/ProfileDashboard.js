import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import RateReadOnly from "../RateReadOnly/RateReadOnly";
import "./ProfileDashboard.css";
import MyDetails from "../MyDetails/MyDetails";
import UpdateProfile from "../UpdateProfile/UpdateProfile";



const ProfileDashBoard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState(0); 

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const responseUser = await axios.get('/api/user/profile');
            setUser(responseUser.data);
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch user data: ', error);
        }
    };
    fetchUserData();
  }, []);

  const handleUpdateUser = async (updatedUser) => {
    try {
        await axios.put('/api/user/profile', updatedUser);
        setUser(updatedUser);
    } catch (error) {
        console.error('Failed to update user data: ', error);
    }
  };
  const handleButtonClick = (buttonIndex) => {
     setActiveButton(buttonIndex); 
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <section id="sectiondashboard">
      <div className="profileViewContainer">
        <div id="pvcover">
          <img id="pvcoverimg" src="https://wallpapers.com/images/hd/mountains-background-kfpok0pdo9yd6ha7.jpg" alt="Cover" />
        </div>
        <div className="pvcontainer">
          <div className="image">
            <img id="pvuserimg" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" className="rounded ml-5" width="155" alt="User" />
            <div id="pvcontacts">
              <h5>{user.phoneNumber}</h5>
              <h5>{user.email}</h5>
            </div>
          </div>
          <div className="pvdetails">
            <div id="pvusername">
              <h1>{user.firstName} {user.lastName}</h1>
            </div>
            <div id="pvposition">
              <h3>{user.proffesion}</h3>
            </div>
            <div id="pvprofilelinks">
              <Link to={`*`} id="fblink">Facebook</Link>
            </div>
          </div>
          <div className="pvrating">
            <div id="pvratecard">
              <RateReadOnly userRating={user.userRating} />
            </div>
          </div>
        </div>
        <hr/>
      </div>
      <div>
      <div id="pvtabbtns">
          <hr/>

          {['My Details', 'Update Profile', 'My Events'].map((buttonText, index) => (
            <button
              key={index}
              className={`pdbtn ${activeButton === index ? 'active' : ''}`}
              onClick={() => handleButtonClick(index)}
            >
              {buttonText}
            </button>
          ))}
         </div>
      </div>
      <div id="pvevents">
        <hr />
        {activeButton === 0 && (
          <MyDetails user={user} /> 
        )}
        {activeButton === 1 && (
          <UpdateProfile
            user={user}    
          />
        )}
        {/* {activeButton === 2 &&(
          //add code for Edit Profile
        )} */}
        
      </div>
    </section>
  );
};

export default ProfileDashBoard;
