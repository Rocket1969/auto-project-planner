import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { TextField, Button } from "@mui/material";

import "./sign-up-form.styles.css";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use.");
      } else {
        console.log("Error creating user.", error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <TextField 
        margin="normal"
        label="Display Name"
        type="text"
        required
        onChange={handleChange}
        name="displayName"
        value={displayName}
        variant="outlined" />
        <TextField 
        margin="normal"
        label="Email"
        type="email"
        required
        onChange={handleChange}
        name="email"
        value={email}
        variant="outlined" />
        <TextField 
        margin="normal"
        label="Password"
        type="password"
        required
        onChange={handleChange}
        name="password"
        value={password}
        variant="outlined" />
        <TextField 
        margin="normal"
        label="Confirm Password"
        type="password"
        required
        onChange={handleChange}
        name="confirmPassword"
        value={confirmPassword}
        variant="outlined" />
        <div className="button-container">
        <Button className="black-btn" type="submit" variant="contained">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
