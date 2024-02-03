import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import validator from "validator";
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [altPhoneNumber, setaltPhoneNumber] = useState('');
  const [organizationName, setorganizationname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [repassword, setrepassword] = useState('');
  const [proffesion, setproffesion] = useState('');
  const [address, setaddress] = useState('');
  const [userType, setuserType] = useState('');
  const [userName, setuserName] = useState('');
  const [accCategory, setaccCategory] = useState('');
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const registerValidation = (e) => {
    e.preventDefault();
    setErrors([]);

    // Your validation logic here
    // ...

    // Example: Check if required fields are filled
    if (!firstName || !lastName || !phoneNumber || !email || !password || !repassword || !proffesion || !userName) {
      setErrors(['Please fill in all fields.']);
    }

    // Example: Check if phone numbers are valid
    if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false }) || phoneNumber.length < 10) {
      setErrors(prevErrors => [...prevErrors, 'Please enter a valid phone number.']);
    }

    // Example: Check if passwords match
    if (password !== repassword) {
      setErrors(prevErrors => [...prevErrors, 'Password fields do not match.']);
    }

    // More validation checks...

    // If there are errors, return to stop form submission
    if (errors.length > 0) {
      return;
    }

    // Proceed with form submission logic
    save();
  };

  useEffect(() => {
    // Fetching data from the server
    Load();
  }, []);

  async function Load() {
    try {
      const result = await axios.get("http://localhost:8080/api/user/");
      // Process the result or set state if needed
      // ...
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  async function save() {
    try {
      const response = await axios.post("http://localhost:8080/api/user/save", {
        // Your data payload here
        // ...
      });

      if (response.status === 200) {
        // Registration successful
        setSuccessMessage('Registration successful');
        // Clear form fields
        setfirstName('');
        setlastName('');
        setphoneNumber('');
        setaltPhoneNumber('');
        setorganizationname('');
        setemail('');
        setproffesion('');
        setuserName('');
        setpassword('');
        setaddress('');
        setaccCategory('');
        setuserType('');

        // Additional actions if needed

      } else {
        // Handle other status codes if needed
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error.message);
    }
  }

  return (
    <section id="regSection">
      <div id="RegisterFormDiv">
        {/* ... Your form structure remains the same ... */}
        <form onSubmit={registerValidation}>
          {/* ... Your form inputs ... */}

          {/* Display success message if registration is successful */}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          {/* Display error messages if there are any */}
          {errors.map((error, index) => (
            <p key={index} style={{ color: 'red' }}>{error}</p>
          ))}

          {/* ... Your form buttons ... */}
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
