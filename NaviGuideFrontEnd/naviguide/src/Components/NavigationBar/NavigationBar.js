import React from "react";
import "./NavigationBar.css" ;
import { Link } from "react-router-dom";




const NavigationBar = () =>{
    return(
        
        <div className="navBar">
            <div class="div1">
                <ul className="listnav">
                    <li ><Link to={""} className="link">HOME</Link></li>
                    <li ><Link to={""} onClick="aboutClick" className="link" >ABOUT</Link></li>
                    <li ><Link to={"*"} className="link">NEWS</Link></li>
                    <li ><Link to={"*"} className="link">CONTACT</Link></li>
                 </ul>
            </div>

            <div class="div2">
              
                <button class="login"><Link to={"*"} className="link1">Login</Link></button>
                <button class="signup"><Link to={"*"} className="link1">Signup</Link></button>
            
            </div>

            
              
        </div>
    );
    
}

export default NavigationBar;