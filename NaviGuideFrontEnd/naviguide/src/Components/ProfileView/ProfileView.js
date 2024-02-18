import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileView = () => {
  const { userName } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/getUserByUserName/${userName}`);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data: ', error);
        setError('An error occurred while fetching user data. Please try again.');
      }
    };

    fetchUserData();
  }, [userName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      {/* <h1>User Details</h1>
      <p>Username: {user.userName}</p>
      <p>Email: {user.email}</p>
      <p>Profession: {user.proffesion}</p> */}
      <div class="">
                                <div class="pvcontainer">
                                    <div class="">
                                        <div class="">
                                        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded ml-5" width="155" />
                                    </div>
                                    <div class="">                                        
                                    <h4 class="">{user.firstName} {user.lastName}</h4>
                                    <span>{user.proffesion}</span>
                                    <div class="">
                                        
                                        <div class="">
                                            <span class="">Completed Awareness Programs</span>
                                            <span class="">980</span>                                            
                                        </div>
                                        <div class="">
                                            <span class="">Rating</span>
                                            <span class="">{user.userRating}</span>                                           
                                        </div>                                        
                                    </div>
                                    <div class="">
                                        <button class=""> 
                                        {/* <Link to={`/profileview/${user.userName}`}>View Profile</Link> */}
                                        </button>
                                        <button class="">Contact</button>                                        
                                    </div>
                                    </div>                                       
                                    </div>                                    
                                </div>
                                </div>


    </section>
  );
};

export default ProfileView;
