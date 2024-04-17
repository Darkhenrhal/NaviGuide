import React, { useState } from "react";
import "./UpdateProfile.css";
import validator from "validator";
import { useEffect } from "react";
import axios from "axios";

const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    altPhoneNumber: "",
    organizationName: "",
    email: "",
    profession: "",
    address: "",
    userType: "",
    userName: "",
    accCategory: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    aboutme: "",
    propic: "",
    coverpic: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePic") {
      setProfilePic(files[0]);
    } else if (name === "coverPic") {
      setCoverPic(files[0]);
    }
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

    //Image Upload part
    const profilePicData = new FormData();
    if (profilePic) {
        profilePicData.append("image", profilePic);
    }

    const coverPicData = new FormData();
    if (coverPic) {
        coverPicData.append("image", coverPic);
    }

    try {
        // Upload profile picture
        let profilePicUrl = "";
        if (profilePic) {
            const response = await axios.post(
                `http://localhost:8080/api/user/uploadimages`,
                profilePicData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            profilePicUrl = response.data.url;
            formData.propic = profilePicUrl;
        }

        // Upload cover picture
        let coverPicUrl = "";
        if (coverPic) {
            const response = await axios.post(
                `http://localhost:8080/api/user/uploadimages`,
                coverPicData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            coverPicUrl = response.data.url;
            formData.coverpic = coverPicUrl;
        }

        // Update user profile
        const response = await axios.put(
            `http://localhost:8080/api/user/updateuser/${user.userName}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        

        if (response.status === 200) {
            alert("User updated successfully!");
        } else {
            alert(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        alert(`User update failed due to an error: ${error}`);
        console.error("Error updating user data:", error);
    }
  };

  return (
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
              <h2 className="topicitem">Profession</h2>
              <input
                id="profession"
                className="inputs"
                type="text"
                name="profession"
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
              <h2 className="subtopicitem">Email:</h2>
              <input
                id="email"
                className="inputs"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <h2 className="subtopicitem">Phone Number:</h2>
              <input
                id="phone"
                className="inputs"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <h2 className="subtopicitem">Alternate Phone Number:</h2>
              <input
                id="altPhoneNumber"
                className="inputs"
                type="text"
                name="altPhoneNumber"
                value={formData.altPhoneNumber}
                onChange={handleInputChange}
              />
              <h2 className="subtopicitem">Address:</h2>
              <input
                id="address"
                className="inputs"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="topics">
              <h2 className="topicitem">About Me</h2>
              <textarea
                id="aboutme"
                className="inputs"
                name="aboutme"
                maxLength={100}
                value={formData.aboutme}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <h2 className="topicitem">Profile Picture</h2>

            <div className="pics">
                <div className="picdiv">
                < img className="pictures" src={formData.propic} alt="Profile"  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePic"
                  onChange={handleImageChange}
                />
            </div>
            <h2 className="topicitem">Cover Picture</h2>

            <div className="pics">
                <div className="picdiv">
                <img className="pictures" src={formData.coverpic} alt="Cover"  />

                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="coverPic"
                  onChange={handleImageChange}
                />
            </div>
            
          </div>
          

          <div id="detailscard2">
            <div className="detailssubcard">
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
                <h2 className="topicitem">User Type</h2>
                <select
                  id="userType"
                  className="inputs"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                >
                  <option value="stakeholder">Stakeholder</option>
                  <option value="resourceperson">Resource Person</option>
                
                </select>
              </div>
              <div className="topics">
                <h2 className="topicitem">User Name</h2>
                <input
                  id="userName"
                  className="inputs"
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            
            <div className="detailssubcard">
              <h1>Social Media</h1>
              <div className="topics">
                <h2 className="topicitem">Facebook</h2>
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
                <h2 className="topicitem">YouTube</h2>
                <input
                  id="youtube"
                  className="inputs"
                  type="text"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleInputChange}
                />
              </div>
              <div className="topics">
                <h2 className="topicitem">LinkedIn</h2>
                <input
                  id="linkedin"
                  className="inputs"
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div id="detailssubcard">
            <button type="submit" className="pdbtnupdate">Update</button>

            </div>
          </div>
          
        </section>

        

        

       
      </form>
      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpdateProfile;
