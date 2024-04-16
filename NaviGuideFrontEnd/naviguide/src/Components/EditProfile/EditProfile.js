// import React,{useEffect, useState} from "react";
// import "./EventsView.css"
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const EditProfile =()=>{
//     const [user,setUser] = useState(null);

//     const fetchUserData = async () => {
//         try {
//           const responseuser = await axios.get(`http://localhost:8080/api/user/getuser/${userName}`);
//           setUser(responseuser.data);
  
//         } catch (error) {
//           setError('An error occurred while fetching user data. Please try again.');
//           console.error('Failed to fetch user data: ', error);
//         }
//       };
  
    

//     return(
//         <section id="regSection">
//             <div id="regdiv">
//                     <div id="regimage">
//                         <div id="head">
//                         <h1>NaviGuide</h1>
//                         </div>
//                         <h1>Registration Guidelines</h1>
                        
//                         <p>Please fill all the fields</p>
//                         <p>You are not allowed to use Existing Email or Username</p>
//                         <p>Phone number format 0XX XXX XXXX</p>
//                         <p>Pasword should contain</p>
//                             <li>at least 8 characters</li>
//                             <li>at least one uppercase</li>
//                             <li>at least one lowercase</li>
//                             <li>at least one symbol</li>
                        
//                         <div id="errors">
//                                         {errors.map((error, index) => (
//                                         <p key={index} style={{ color: 'red' }}>{error}</p>
//                                         ))}
//                         </div>
//                     </div>
//                     <div id="RegisterFormDiv">
//                         <div id="topic_Reg">
//                         <h2>Sign Up</h2>
//                         </div>
                    
//                         <form onSubmit={(e)=>registerValidation(e)}>
//                         <div id="content" className="content">

//                             <div className="row">
//                                 <div className="cardreg">
//                                 <label htmlFor="fname">First Name</label>
//                                 <input
//                                     type="text"
//                                     className="inputs"
//                                     name="fname"
//                                     id="fname"
//                                     value={firstName}
//                                     onChange={(e) => setfirstName(e.target.value)}
//                                     required
//                                 />
//                                 </div>
//                                 <div className="cardreg">
//                                 <label htmlFor="lname">Last Name</label>
//                                 <input
//                                     type="text"
//                                     id="lname"
//                                     name="lname"
//                                     className="inputs"
//                                     value={lastName}
//                                     onChange={(e) => setlastName(e.target.value)}
//                                     required
//                                 />
//                                 </div>
                                
//                             </div>

//                             <div className="row">
//                             <div className="cardregsingle">
//                                 <label htmlFor="email">email Address</label>
//                                     <input
//                                     id="email"
//                                     className="inputssingle"
//                                     type="email"
//                                     name="email"  
//                                     value={email}
//                                     onChange={(e) => setemail(e.target.value)}
//                                     required
//                                     />
//                             </div>
                            
                            
//                             </div>
//                             <div className="row">
//                                 <div className="cardreg">
//                                     <label htmlFor="userName">Username</label>
//                                         <input
//                                         id="userName"
//                                         className="inputs"
//                                         type="text"
//                                         name="userName"  
//                                         value={userName}
//                                         onChange={(e) => setuserName(e.target.value)}
//                                         required
//                                         />
                                
//                                 </div>
//                                 <div className="cardreg">
//                                 <label htmlFor="accCategory">Account Category</label>
//                                     <select 
//                                         id="accCatagory"
//                                         className="inputs"  
//                                         name="accCatagory"
//                                         value={accCategory}
//                                         onChange={(e) => setaccCategory(e.target.value)}
//                                     >
//                                         <option>Health Awareness</option>
//                                         <option>Environmental Awareness</option>
//                                         <option>Social Issues Awareness</option>
//                                         <option>Safety and Security Awareness</option>
//                                         <option>Educational Awareness</option>
//                                         <option>Cultural Awareness</option>
//                                         <option>Workplace Awareness</option>
//                                         <option>Human Rights Awareness</option>
//                                         <option>Technology and Digital Literacy Awareness</option>
//                                         <option>Political and Civic Awareness</option>  
//                                         <option>None</option>
//                                     </select>
                                        
//                                 </div>
//                             </div>
                        
//                             <div className="row">
//                                 <div className="cardreg">
//                                     <label htmlFor="phone">Phone number</label>
//                                     <input 
//                                     type="text"
//                                     name="phone"
//                                     id="phone"
//                                     className="inputs"
//                                     placeholder="07XXXXXXXX"
//                                     value={phoneNumber}
//                                     onChange={(e)=> setphoneNumber(e.target.value)}
//                                     required
//                                     />
//                                 </div>
//                                 <div className="cardreg">
//                                 <label htmlFor="phone-alt">Phone number (Fixed line)</label>
//                                     <input 
//                                     type="text"
//                                     name="altPhoneNumber"
//                                     id="altPhoneNumber"
//                                     className="inputs"
//                                     placeholder="0XXXXXXXXX"
//                                     value={altPhoneNumber}
//                                     onChange={(e)=> setaltPhoneNumber(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="cardreg">
//                                 <label htmlFor="oname">Organization Name</label>
//                                     <input
//                                         type="text"
//                                         id="oname"
//                                         name="oname"
//                                         className="inputs"
//                                         value={organizationName}
//                                         onChange={(e) => setorganizationname(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="cardreg">           
//                                     <label htmlFor="proffesion">proffesion</label>
//                                     <input
//                                         type="text"
//                                         id="proffesion"
//                                         name="proffesion"
//                                         className="inputs"
//                                         value={proffesion}
//                                         onChange={(e) => setproffesion(e.target.value)}            
//                                     />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="cardregsingle">
//                                 <label htmlFor="address">Address</label>
//                                         <input 
//                                         type="text"
//                                         name="address"
//                                         id="address"
//                                         className="inputssingle"
//                                         value={address}
//                                         onChange={(e)=> setaddress(e.target.value)}
//                                         />
//                                 </div>                           
//                             </div>

//                         <div id="pass">
//                                 <div className="cardreg">
//                                 <label htmlFor="password">password</label>
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     name="password"
//                                     className="inputs"
//                                     value={password}
//                                     onChange={(e) => setpassword(e.target.value)}
//                                 />
//                                 </div>
//                                 <div className="cardreg">
//                                 <label htmlFor="repassword">Re-type password</label>
//                                 <input
//                                     id="repassword"
//                                     className="inputs"
//                                     type="password"
//                                     name="repassword"
//                                     value={repassword}
//                                     onChange={(e) => setrepassword(e.target.value)}
//                                 />
//                                 </div>
//                         </div>             
//                         <div className="check">   
//                         <p>Register as</p>
//                                 <div className="cardregtype">
                                
//                                 <input 
//                                     type="checkbox" 
//                                     id="resource" 
//                                     name="resourse"
//                                     value={userType}
//                                     className="chkbox"
//                                     onChange={(e)=> setuserType("resourceperson")}  /><label htmlFor="resource" >Resource Provider</label>
//                                 <input 
//                                     type="checkbox" 
//                                     id="stake" 
//                                     name="stake"
//                                     value={userType}
//                                     className="chkbox"
//                                     onChange={(e)=> setuserType("stakeholder")}
//                                     /><label htmlFor="stake">Stakeholder</label>

//                                 </div>
//                                 <div className="cardreg">
//                                 <p></p>
//                                 </div>
//                         </div>
                        
                            
//                         <div id="button_Reg">
                                
//                                         <p>Already have an account? <Link to="/login" id="linksign">Sign in</Link></p>
//                                         <div id="buttons">
//                                             <input 
//                                             type="submit" 
//                                             name="btnRegister" 
//                                             className="btnRegister" 
//                                             value="Sign up"
                                            
                                            
//                                             />
//                                             <button id="GRegister" name="Gregister" className="btnRegister">Sign up with Google</button>
//                                         </div>
                                        
//                         </div>  
//                         </div>            
//                     </form>
//                     </div>

//             </div>
                
    
//     </section>
//     );

// }

// export default EditProfile;
import React,{useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = ({ user, onUpdateUser, onClose }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [profession, setProfession] = useState(user.profession);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Update the user data in the backend
    try {
      const updatedUser = { firstName, lastName, email, phoneNumber, profession };
      await onUpdateUser(updatedUser);
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update user: ", error);
    }
  };

  return (
    <div className="edit-profile-modal">
      <div className="edit-profile-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Phone Number:
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
          <label>
            Profession:
            <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
