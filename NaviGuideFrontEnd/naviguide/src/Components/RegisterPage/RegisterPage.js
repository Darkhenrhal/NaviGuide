import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import validator from "validator";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastname,setLastName]=useState('');
  const [phone,setPhone]=useState('');
  const [phonealt,setPhonealt]=useState('');
  const [organizationame,setOrganizationname]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword]=useState('');
  const [profession,setProffesion]=useState('');
  const [address,setAddress]=useState('');
  const [errors, setErrors] = useState([]);

  const registerValidation = async (e) => {
    e.preventDefault();

    setErrors([]);

    

    if (!address || !firstName || !email || !password ||!lastname||!phone||!repassword||!profession ||!lastname) {
      setErrors(['Please fill in all fields.']);
    }

    const cleanPhoneNumber = phone.replace(/\D/g, ''); // Remove non-numeric characters
    const cleanPhoneNumberAlt=phonealt.replace(/\D/g, ''); // Remove non-numeric characters
    const isValidPhoneNumber = validator.isMobilePhone(cleanPhoneNumber, 'any', { strictMode: false });
    const isValidPhoneNumberAlt=validator.isMobilePhone(cleanPhoneNumberAlt, 'any',{strictMode:false});

    if (!isValidPhoneNumber || phone.length<10) {
    setErrors(prevErrors =>[...prevErrors,'Please enter a valid phone number.']);
    }
   

    if (!isValidPhoneNumberAlt || phonealt.length<1){
      setErrors(prevErrors => [...prevErrors,'Please enter a valid phone number (Fixed Line)']);
    }

    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      setErrors(prevErrors => [...prevErrors, 'Your password needs at least 8 characters, lowercase and uppercase characters, numbers, and symbols']);
    }
    

    if (!password.match(repassword)){
      setErrors(prevErrors => [...prevErrors,'Password fields does not match']);
    }

    if(errors.length>0){
      return
    }

    
    console.log('No error in Empty inputs');
 
    }
   
  
  return (
    <section id="regSection">
            <div id="RegisterFormDiv">
            <div id="topic_Reg">
              <h2>Sign Up</h2>
            </div>
            
            <form onSubmit={registerValidation}>
              <div id="content" className="inputs">

                <div className="row">
                      <div className="card">
                        <label htmlFor="fname">First Name</label>
                        <input
                          type="text"
                          className="finputs"
                          name="fname"
                          id="fname"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="card">
                        <label htmlFor="lname">Last Name</label>
                        <input
                          type="text"
                          id="lname"
                          name="lname"
                          className="finputs"
                          value={lastname}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                      
                </div>

                <div className="row">
                  <div className="cardsingle">
                    <label htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          className="inputssingle"
                          type="email"
                          name="email"  
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                  </div>
                    
                </div>
                
                <div className="row">
                  <div className="card">
                    <label htmlFor="phone">Phone number</label>
                      <input 
                        type="text"
                        name="phone"
                        id="phone"
                        className="inputs"
                        placeholder="07XXXXXXXX"
                        value={phone}
                        onChange={(e)=> setPhone(e.target.value)}
                        required
                      />
                  </div>
                  <div className="card">
                  <label htmlFor="phone-alt">Phone number (Fixed line)</label>
                      <input 
                        type="text"
                        name="phonealt"
                        id="phonealt"
                        className="inputs"
                        placeholder="0XXXXXXXXX"
                        value={phonealt}
                        onChange={(e)=> setPhonealt(e.target.value)}
                      />
                  </div>
                </div>
                <div className="row">
                  <div className="card">
                    <label htmlFor="oname">Organization Name</label>
                        <input
                          type="text"
                          id="oname"
                          name="oname"
                          className="inputs"
                          value={organizationame}
                          onChange={(e) => setOrganizationname(e.target.value)}
                        />
                  </div>
                  <div className="card">           
                        <label htmlFor="proffesion">Profession</label>
                        <input
                          type="text"
                          id="proffesion"
                          name="proffesion"
                          className="inputs"
                          value={profession}
                          onChange={(e) => setProffesion(e.target.value)}            
                        />
                  </div>
                  
                </div>
                <div className="row">
                  <div className="cardsingle">
                    <label htmlFor="address">Address</label>
                          <input 
                            type="text"
                            name="address"
                            id="address"
                            className="inputssingle"
                            value={address}
                            onChange={(e)=> setAddress(e.target.value)}
                          />
                  </div>
                        
                </div>

                <div id="pass">
                  <div className="card">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="inputs"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="card">
                    <label htmlFor="repassword">Re-type Password</label>
                    <input
                      id="repassword"
                      className="inputs"
                      type="password"
                      name="repassword"
                      value={repassword}
                      onChange={(e) => setRepassword(e.target.value)}
                    />
                  </div>
                </div>
        
              
              
                <div className="check">
                  
                  <div className="card">
                    <p>Register as</p>
                    <input type="checkbox" id="resource" name="resourse" /><label htmlFor="resource">Resource Provider</label>
                    <input type="checkbox" id="stake" name="stake" /><label htmlFor="stake">Stakeholder</label>

                  </div>
                  <div className="card">
                  <p></p>
                  </div>
                </div>
              </div>
              <div id="button_Reg">
                <div id="errors">
                  {errors.map((error, index) => (
                    <p key={index} style={{ color: 'red' }}>{error}</p>
                  ))}
                </div>
                
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
                <input type="submit" name="btnRegister" className="btnRegister" value="Sign up" />
                <button id="GRegister" name="Gregister" className="btnRegister">Sign up with Google</button>
              </div>
            </form>
          </div>
        
   
    </section>
   
  );
}

export default RegisterForm;
