import { useState } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import { TextField, Button } from "@mui/material";

import "./sign-in-form.styles.css"

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email.");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email.");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
          variant="outlined"
        />
        <TextField
          margin="normal"
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          variant="outlined"
        />
        <div className="button-container">
        <Button className="black-btn" type="submit" variant="contained">Sign In</Button>
        <Button 
        onClick={signInWithGoogle} 
        type="button" variant="contained"
        >Sign In With Google</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
