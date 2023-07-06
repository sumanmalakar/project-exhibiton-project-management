import React, { useState, useContext } from "react";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Firebase/firebaseConfig";
import {
  Grid,
  Typography,
  Hidden,
  Box,
  TextField,
  Button,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import { customTheme } from "../misc/customTheme";

import { db } from '../Firebase/firebaseConfig'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function LoginWithEmail() {
  const navigate = useNavigate();
  //   const classes = useStyles();
  const [data, setData] = useState({});
  const auth = getAuth(app);

  const handleInput = (event) => {
    let newInput = {
      [event.target.name]: event.target.value,
    };

    setData({ ...data, ...newInput });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;



        const formDataCopy = { ...data }
        delete formDataCopy.password
        formDataCopy.createdat = serverTimestamp()
  
       setDoc(doc(db, 'users', user.uid), formDataCopy)
  

        // window.location = "/"
        sessionStorage.setItem("auth", JSON.stringify(user));

        // return navigate("/admin");
        // return navigate("/navbar");
        return navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(error.message);
        const errorMessage = error.message;
      });
  };

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <form>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => handleInput(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => handleInput(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
        />
        <Link to="/sidebar">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2, mb: 2 }}
            style={{
              lineHeight: "48px",
              borderRadius: "5px",
              backgroundColor: customTheme.color.primary,
            }}
            onMouseDown={(e) => (e.target.style.opacity = "0.8")}
            onMouseUp={(e) => (e.target.style.opacity = "1")}
          >
            Log In
          </Button>
        </Link>
      </form>
    </Box>
  );
}
