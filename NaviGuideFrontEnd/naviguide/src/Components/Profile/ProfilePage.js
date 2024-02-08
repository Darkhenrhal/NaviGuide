import React from "react";
import "./ProfilePage.css";
import { useAuth } from "../../AuthContext";


const ProfilePage = () => {

    const {user}=useAuth();
    return(
        <section id="profilesection">
            {user ?(
                <div id="profilediv">
                <h2>Welcome, {user.email} </h2>
            </div> 
            ):(
                <p>Please log in</p>
            )}

            <div id="user">
                <div id="image">
                    <img src="https://drive.google.com/file/d/1sPB5Lp4y4iuWFUSycYeWCTFh-F98Gc4O/view?usp=sharing"/>
                </div>
                
            </div>
                       
        </section>
    );
}

export default ProfilePage;