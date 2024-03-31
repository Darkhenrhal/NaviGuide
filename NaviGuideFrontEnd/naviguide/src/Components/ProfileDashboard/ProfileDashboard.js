import React from "react";
import "./ProfileDashboard.css";
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
            
            <script
            type="text/javascript"
            src="../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"></script>
            
 
                       
        </section>
    );
}

export default ProfilePage;