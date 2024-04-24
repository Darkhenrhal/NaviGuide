import React from "react";
import "./Reviews.css";
import "../RateUser/RateUser"
import RateUser from "../RateUser/RateUser";


const Reviews=({user})=>{


    return(
        <section id="reviewSection">
            <form id="ReviewSubmit">
            <div className="detailssubcarddelete" id="detailssubcardreview">
              <h1 className="pveventstopics">Add review</h1>
              <div className="topics">
                <div id="topicandclose">
                <button className="devbtn" id="closebtnreview" >Close</button>

                    <h2 className="subtopicitem">My Review</h2>
                </div>
                
              <textarea
                id="aboutme"
                className="inputs"
                name="aboutme"
                maxLength={100}
                value=""
                onChange=""
              ></textarea>
                    <h2 className="subtopicitem">How you feel</h2>
                <RateUser/>

            </div>
              
            
              <button type="submit" className="devbtn" id="addeacc">Add</button>

            </div>


            </form>
            
           
        </section>
    );
}

export default Reviews;