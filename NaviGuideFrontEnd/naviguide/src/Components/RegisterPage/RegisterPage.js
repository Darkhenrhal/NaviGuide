import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import validator from "validator";
//import bcrypt from 'bcryptjs';

const RegisterForm = () => {
  const [firstName, setfirstName] = useState('');//ok
  const [lastName,setlastName]=useState('');//ok
  const [phoneNumber,setphoneNumber]=useState('');//ok
  const [altPhoneNumber,setaltPhoneNumber]=useState('');//ok
  const [organizationName,setorganizationname]=useState('');//ok
  const [email, setemail] = useState('');//ok
  const [password, setpassword] = useState('');//ok
  const [repassword, setrepassword]=useState('');//ok
  const [proffesion,setproffesion]=useState('');//ok
  const [address,setaddress]=useState('');//ok
  const [userType,setuserType]=useState('');//pk
  const [userName,setuserName]=useState('');//ok
  const [accCategory,setaccCategory]=useState('');//ok
  const [errors, setErrors] = useState([]);

  const registerValidation = async (e) => {
    e.preventDefault();

    setErrors([]);

    

    if (!address || !firstName || !email || !password ||!lastName||!phoneNumber||!repassword||!proffesion ||!lastName || !userName) {
      setErrors(['Please fill in all fields.']);
    }

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
    const cleanPhoneNumberAlt=altPhoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
    const isValidPhoneNumber = validator.isMobilePhone(cleanPhoneNumber, 'any', { strictMode: false });
    const isValidPhoneNumberAlt=validator.isMobilePhone(cleanPhoneNumberAlt, 'any',{strictMode:false});

    if (!isValidPhoneNumber || phoneNumber.length<10) {
      setErrors(prevErrors =>[...prevErrors,'Please enter a valid phone number.']);
    }
   

    if (!isValidPhoneNumberAlt || altPhoneNumber.length<1){
      setErrors(prevErrors => [...prevErrors,'Please enter a valid phone number (Fixed Line)']);
    }

    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      setErrors(prevErrors => [...prevErrors, 'Your password needs at least 8 characters, lowercase and uppercase characters, numbers, and symbols']);
    }
    

    if (!password.match(repassword)){
      setErrors(prevErrors => [...prevErrors,'password fields does not match']);
    }

    if(errors.length>0){
      return
    }

    console.log('No error in Empty inputs');
    save(e);
    }

    useEffect(()=>{
      //(async () => await Load())();
    }, []);

    async function Load(){
      const result=await axios.get(
        "http://localhost:8080/api/user/");
           //setUsers(result.data);
           //console.log(result.data);
    }

    async function save(e)
    {
        e.preventDefault();
        // Check if the username or email already exists
        const existingUser = await axios.get(`http://localhost:8080/api/user/getUser/${userName}`);
        if (existingUser.data) {
          alert('Username is already taken. Please choose a different one.');
          return;
        }

        const existingEmailUser = await axios.get(`http://localhost:8080/api/user/getUserByEmail/${email}`);
        if (existingEmailUser.data) {
          alert('Email is already registered. Please use a different one.');
          return;
        }
        try
            {
            const response=await axios.post("http://localhost:8080/api/user/save",
            
            {
              firstName:firstName,
              lastName:lastName,
              phoneNumber:phoneNumber,
              altPhoneNumber:altPhoneNumber,
              organizationName:organizationName,
              email:email,
              proffesion:proffesion,
              userName:userName,
              password:password,
              address:address,
              accCategory:accCategory,
              userType:userType
  
            });
            
            if(response.status===200){
              //Registration is successfull here
              alert("User Registered Successfully");
              setfirstName("");
              setlastName("");
              setphoneNumber("");
              setaltPhoneNumber("");
              setorganizationname("");
              setemail("");
              setaccCategory("");
              setproffesion("");
              setuserName("");
              setpassword("");
              setaddress("");
              setuserType("");
              
              //Load();

            }else{
              alert('Unexpected response status :',response.status);
            }
            }catch(err){
              alert("User Registation Failed : Network Error");
            }
   }

    
   
  
  return (
    <section id="regSection">
            <div id="RegisterFormDiv">
              <div id="topic_Reg">
                <h2>Sign Up</h2>
              </div>
            
              <form onSubmit={(e)=>registerValidation(e)}>
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
                          onChange={(e) => setfirstName(e.target.value)}
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
                          value={lastName}
                          onChange={(e) => setlastName(e.target.value)}
                          required
                        />
                      </div>
                      
                  </div>

                  <div className="row">
                    <div className="cardsingle">
                      <label htmlFor="email">email Address</label>
                          <input
                            id="email"
                            className="inputssingle"
                            type="email"
                            name="email"  
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            required
                          />
                    </div>
                  
                    
                    </div>
                    <div className="row">
                        <div className="card">
                          <label htmlFor="userName">Username</label>
                              <input
                                id="userName"
                                className="inputssingle"
                                type="text"
                                name="userName"  
                                value={userName}
                                onChange={(e) => setuserName(e.target.value)}
                                required
                              />
                      
                        </div>
                      <div className="card">
                        <label htmlFor="accCategory">Account Category</label>
                            
                            <select 
                              id="accCatagory"
                              className="inputssingle"  
                              name="accCatagory"
                              value={accCategory}
                              onChange={(e) => setaccCategory(e.target.value)}
                            >
                                <option>Health Awareness</option>
                                <option>Environmental Awareness</option>
                                <option>Social Issues Awareness</option>
                                <option>Safety and Security Awareness</option>
                                <option>Educational Awareness</option>
                                <option>Cultural Awareness</option>
                                <option>Workplace Awareness</option>
                                <option>Human Rights Awareness</option>
                                <option>Technology and Digital Literacy Awareness</option>
                                <option>Political and Civic Awareness</option>  
                                <option>None</option>
                            </select>
                                
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
                            value={phoneNumber}
                            onChange={(e)=> setphoneNumber(e.target.value)}
                            required
                          />
                      </div>
                      <div className="card">
                      <label htmlFor="phone-alt">Phone number (Fixed line)</label>
                          <input 
                            type="text"
                            name="altPhoneNumber"
                            id="altPhoneNumber"
                            className="inputs"
                            placeholder="0XXXXXXXXX"
                            value={altPhoneNumber}
                            onChange={(e)=> setaltPhoneNumber(e.target.value)}
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
                              value={organizationName}
                              onChange={(e) => setorganizationname(e.target.value)}
                            />
                      </div>
                      <div className="card">           
                            <label htmlFor="proffesion">proffesion</label>
                            <input
                              type="text"
                              id="proffesion"
                              name="proffesion"
                              className="inputs"
                              value={proffesion}
                              onChange={(e) => setproffesion(e.target.value)}            
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
                                onChange={(e)=> setaddress(e.target.value)}
                              />
                      </div>                           
                  </div>

                <div id="pass">
                      <div className="card">
                        <label htmlFor="password">password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="inputs"
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                        />
                      </div>
                      <div className="card">
                        <label htmlFor="repassword">Re-type password</label>
                        <input
                          id="repassword"
                          className="inputs"
                          type="password"
                          name="repassword"
                          value={repassword}
                          onChange={(e) => setrepassword(e.target.value)}
                        />
                      </div>
                </div>             
                <div className="check">   
                      <div className="cardtype">
                        <p>Register as</p>
                        <input 
                          type="checkbox" 
                          id="resource" 
                          name="resourse"
                          value={userType}
                          onChange={(e)=> setuserType("resourceperson")}  /><label htmlFor="resource" >Resource Provider</label>
                        <input 
                          type="checkbox" 
                          id="stake" 
                          name="stake"
                          value={userType}
                          onChange={(e)=> setuserType("stakeholder")}
                          /><label htmlFor="stake">Stakeholder</label>

                      </div>
                      <div className="card">
                      <p></p>
                      </div>
                </div>
                <div id="button_Reg">
                          <div id="errors">
                            {errors.map((error, index) => (
                              <p key={index} style={{ color: 'red' }}>{error}</p>
                            ))}
                          </div>
                    
                              <p>Already have an account? <Link to="/login">Sign in</Link></p>
                              <input 
                                type="submit" 
                                name="btnRegister" 
                                className="btnRegister" 
                                value="Sign up"
                                // onClick={save}
                                //onClick={save}
                              />
                              <button id="GRegister" name="Gregister" className="btnRegister">Sign up with Google</button>
                </div>  
              </div>            
            </form>
          </div>
        
   
    </section>
   
  );
}

export default RegisterForm;
