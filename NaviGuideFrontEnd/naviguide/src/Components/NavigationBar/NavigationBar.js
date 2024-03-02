import React from "react";
import "./NavigationBar.css" ;
import { Link } from "react-router-dom";
import HomePage from "../HomePage/HomePage";



const NavigationBar = () =>{
    return(
        
        <div className="navBar">
            <ul>
            <li><Link to={HomePage} className="link">HOME</Link></li>
            <li><Link to={'*'} className="link">ABOUT</Link></li>
            <li><Link to={'*'} className="link">CONTACT</Link></li>
            <li><Link to={'*'} className="link">SERVICES</Link></li>
            </ul>

        </div>
    );

}

export default NavigationBar;