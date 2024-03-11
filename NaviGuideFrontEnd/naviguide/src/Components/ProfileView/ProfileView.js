import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./ProfileView.css";
import { Link } from "react-router-dom";
import EventsView from "../EventsView/EventsView";
import RateReadOnly from "../RateReadOnly/RateReadOnly";;

const ProfileView = () => {
  // const { userName } = useParams();
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/user/getuser/${userName}`);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch user data: ', error);
  //       setError('An error occurred while fetching user data. Please try again.');
  //     }
  //   };

  //   fetchUserData();
  // }, [userName]);

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <section>
      
      <div class="profileViewContainer">
        <div id="pvcover">
          <img id="pvcoverimg" src="https://wallpapers.com/images/hd/mountains-background-kfpok0pdo9yd6ha7.jpg"/>
        </div>
        <div class="pvcontainer">

          <div class="image">
              <img id="pvuserimg" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded ml-5" width="155" />
              <div id="pvcontacts">
              <h5>Phone number </h5>
              <h5>Email</h5>
              <button id="pvbtn">Contact</button>
              
            </div>
          </div>
          <div className="pvdetails">
            <div id="pvusername">
              <h1>UserName</h1>
            </div>
            <div id="pvposistion">
              <h3>Possition</h3>
            </div>
            
            <div id="pvprofilelinks">
              <Link to={`*`} id="fblink">Facebook</Link>
            </div>
            

          </div> 
          <div className="pvrating">
            <div id="pvratecard">
              <h1>Rating</h1>
              <div>
                {/* //<RateReadOnly/> */}
              </div>
            </div>
          </div>
          
             
        </div>
        
      </div>
      <div id="pvevents">
          <hr/>
          <h1>Events hold by UserName</h1>
          <EventsView/>
      </div>
       
    </section>
  );
};

export default ProfileView;
