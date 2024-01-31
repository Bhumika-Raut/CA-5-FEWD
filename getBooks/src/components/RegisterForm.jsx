import React, { useState } from "react";
import "./RegisterForm.css"; 

//  importing required files

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
 
 

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

     // declared state variable which are initially empty
  
    if (name === 'name') {
      const maxLength = 30;
      const minLength = 3;
      updatedValue = value.slice(0, maxLength);

      if (value.length > maxLength) {
        setNameError('Name should not be more than 30 characters.');
      } else if (value.length < minLength) {
        setNameError('Name should be at least 3 characters.');
      } else {
        setNameError('');
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }

  
    if (name === 'password') {
      const minLength = 10;
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (value.length < minLength || !hasSpecialCharacter) {
        setPasswordError('Password should be at least 10 characters and must contain at least one special character.');
      } else {
        setPasswordError('');
      }
    }

    // Above are the requirements that user need to fullfil 

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

  
    if (nameError) {
      return;
    }

    
    if (emailError) {
      return;
    }


    if (passwordError) {
      return;
    }

    onRegister(formData);

    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
  };

  // Above are the conditions for error 
  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Registration Form</h2>

      {passwordMismatch && <p className="error-message">Password and Confirm Password do not match.</p>}
      {nameError && <p className="error-message">{nameError}</p>}
      {emailError && <p className="error-message">{emailError}</p>}
      {passwordError && <p className="error-message">{passwordError}</p>}

      <label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegisterForm;
