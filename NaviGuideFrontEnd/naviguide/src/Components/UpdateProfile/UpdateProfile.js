import React, { useState } from "react";
import "./UpdateProfile.css";
import validator from "validator";
import { useEffect } from "react";
import axios from "axios";


const UpdateProfile =({user})=>{
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      altPhoneNumber: "",
      organizationName: "",
      email: "",
      proffesion: "",
      address: "",
      userType: "",
      userName: "",
      accCategory: "",
      facebook: "",
      youtube: "",
      linkedin: "",
      aboutme: ""
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/getuser/${user.userName}`);
                setFormData(response.data);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user.userName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);


        const existingUserName = await axios.get(`api/user/getuser/${FormData.userName}`);
        if (existingUserName.data) {
          alert('Username is already taken. Please choose a different one.');
          return;
        }

        const existingEmailUser = await axios.get(`api/user/getuserbyemail/${FormData.email}`);
        if (existingEmailUser.data) {
          alert('Email is already registered. Please use a different one.');
          return;
        }


        if (!formData.firstName || 
           !formData.lastName || 
           !formData.phoneNumber || 
           !formData.proffesion || 
           !formData.address || 
           !formData.userType || 
           !formData.userName ||
           !formData.email ||
           !formData.accCategory
          
          ) {
            setErrors(["Please fill in all required fields."]);
            return;
        }

        

        if (!validator.isEmail(formData.email)) {
            setErrors(["Please enter a valid email address."]);
            return;
        }

        const cleanPhoneNumber = formData.phoneNumber.replace(/\D/g, '');
        const isValidPhoneNumber = validator.isMobilePhone(cleanPhoneNumber, 'any', { strictMode: false });
        if (!isValidPhoneNumber) {
            setErrors(["Please enter a valid phone number."]);
            return;
        }

        const cleanAltPhoneNumber = formData.altPhoneNumber.replace(/\D/g, '');
        const isValidAltPhoneNumber = validator.isMobilePhone(cleanAltPhoneNumber, 'any', { strictMode: false });
        if (!isValidAltPhoneNumber) {
            setErrors(["Please enter a valid alternate phone number."]);
            return;
        }

        if (errors.length > 0) {
            return;
        }

        try {
            const response = await axios.put(`api/user/updateuser/${user.userName}`, formData);

            if (response.status === 200) {
                alert("User updated successfully!");
            } else {
                alert("Unexpected response status: " + response.status);
            }
        } catch (error) {
            alert("User update failed due to a network error.");
            console.error("Error updating user data:", error);
        }
    };

    return(
        <section>
            <h1>Update your Account</h1>
            <form onSubmit={handleSubmit} id="updateprofile">
                
                <section id="infoContainer">
                    <div id="detailscard1">
                        <h1>My Information</h1>
                        <div className="topics">
                            <h2 className="topicitem">Name</h2>
                            <h2 className="subtopicitemupdate">First Name:</h2>
                            <input 
                                  id="fname" 
                                  className="inputs" 
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleInputChange}
                            />
                            <h2 className="subtopicitemupdate">Last Name:</h2>
                            <input 
                                  id="lname"
                                  className="inputs"
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                            />
                        </div>
                        <div className="topics">
                            <h2 className="topicitem">Proffession</h2>
                            <input 
                                id="profession"
                                className="inputs"
                                type="text"
                                name="proffesion"
                                value={formData.proffesion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="topics">
                            <h2 className="topicitem">Organization</h2>
                            <input 
                                id="oname"
                                className="inputs"
                                type="text"
                                name="organizationName"
                                value={formData.organizationName}
                                onChange={handleInputChange}
                            />                            
                        </div>
                        <div className="topics">
                            <h2 className="topicitem">Contacts</h2>
                            <h2 className="subtopicitem">Email        :</h2> 
                            <input 
                                id="email"
                                className="inputs"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <h2 className="subtopicitem">Phone Number :</h2>
                            <input 
                                id="phone"
                                className="inputs"
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                            <h2 className="subtopicitem">Phone Number (Fixed) : </h2>
                            <input 
                                id="altPhoneNumber"
                                className="inputs"
                                type="text"
                                name="altPhoneNumber"
                                value={formData.altPhoneNumber}
                                onChange={handleInputChange}
                            />
                            <h2 className="subtopicitem">Address</h2>
                            <input 
                                 id="address"
                                 className="inputs"
                                 type="text"
                                 name="address"
                                 value={formData.address}
                                 onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div id="detailscard2" >
                        <div className="detailssubcard" >
                        <h1>Account Details</h1>

                            <div className="topics">
                                <h2 className="topicitem">Account Category</h2>
                                <select 
                                    id="accCategory"
                                    className="inputs"
                                    name="accCategory"
                                    value={formData.accCategory}
                                    onChange={handleInputChange}
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
                            <div className="topics">
                                <h2 className="topicitem">Account Type</h2>
                                <select 
                                    id="userType"
                                    className="inputs"
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleInputChange}
                                  >
                                  <option value="resourceperson">Resource Person</option>
                                  <option value="stakeholder">Stakeholder</option>
                                </select>
                            </div>
                        </div> 
                        <div className="detailssubcard">
                        <h1>Social Media</h1>
                            <div className="topics">
                                <h2 className="subtopicitemupdate">Facebook</h2>
                                <input 
                                    id="facebook"
                                    className="inputs"
                                    type="text"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="topics">
                                <h2 className="subtopicitemupdate">LinkedIn</h2>
                                <input 
                                    id="linkedin"
                                    className="inputs"
                                    type="text"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="topics">
                                <h2 className="subtopicitemupdate">Youtube</h2>
                                <input 
                                    id="youtube"
                                    className="inputs"
                                    type="text"
                                    name="youtube"
                                    value={formData.youtube}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div> 
                        <div className="detailssubcard">
                        <h1>Profile</h1>
                            <div className="profileimages">
                                <div className="topics">
                                    <h2 className="subtopicitemupdate">Profile Picture</h2>
                                    
                                </div>
                                <div className="topics">
                                    <h2 className="subtopicitemupdate">Cover Photo</h2>
                                    
                                </div>
                            </div>
                            
                            <div className="topics">
                                <h2 className="subtopicitemupdate">About Me</h2>
                                <textarea 
                                    id="aboutme"
                                    className="inputs"
                                    name="aboutme"
                                    value={formData.aboutme}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" id="pdbtnupdate">Update Profile</button>
                            {errors.length > 0 && (
                                <div className="error-messages">
                                    {errors.map((error, index) => (
                                        <div key={index} className="error-message">
                                            {error}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div> 
                    </div>
                

                </section>


            </form>

        </section>
    );

}

export default UpdateProfile;
