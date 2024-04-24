import React from "react";
import "./Reviews.css";
import ReviewReadOnly from "../RateReadOnly/ReviewReadOnly";


const Reviews=({user})=>{
    return(
        <section id="reviewSection">
            <h1 className="pveventstopics">Reviews</h1>
            <div className="ReviewDiv">
                    <div className="eventcard">
                        <div id="eventNameSchedule">
                            <div id="namesandbtnreview">
                                <h1 className="eventnameheduled">USER</h1>
                                <h5>ReviewDate</h5>
                                <ReviewReadOnly userRating={3} />  
                            </div>
                            
                        </div>
                        <div id="eventDetails">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                            mollit anim id est laborum.</p>
                        </div>
                                               
                        </div>
                
            </div>
           
        </section>
    );
}

export default Reviews;