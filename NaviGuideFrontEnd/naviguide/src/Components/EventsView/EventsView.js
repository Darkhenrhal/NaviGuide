import React,{useEffect, useState} from "react";
import "./EventsView.css"
import axios from "axios";
import { useParams } from "react-router-dom";

const EventsView =()=>{
    
    return(
        <div id="eventcard">
            <div id="eventName">
                <h1>Event Name</h1>
                <h5>2022/05/10</h5>
            </div>
            <div id="eventDetails">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                  mollit anim id est laborum.</p>
            </div>
            <div id="eventImages">
                <img  src="https://drive.google.com/thumbnail?id=1KgigAnjd0aXzwZDsrEYDzH5bgY8Qnjsy&sz=w1000"/>
            
            </div>
            
        </div>
    );

}

export default EventsView;