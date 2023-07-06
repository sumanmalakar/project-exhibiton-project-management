import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { OAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../Firebase/firebaseConfig'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {
  app,
  googleProvider,
  microsoftProvider,
} from "../Firebase/firebaseConfig";
import {
  Grid,
  Typography,
  Hidden,
  Box,
  TextField,
  Button,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const auth = getAuth(app);

  //Sign In with Google

  // const googleSignIn = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then((result) => {
  //       setValue(result.user.email);
  //       // sessionStorage.setItem("user", JSON.stringify(result.user));
  //       // sessionStorage.setItem("email", result.user.email);
  //       // return navigate("/admin");
  //       // return navigate("/navbar");
  //       return navigate("/dashboard");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const googleSignIn = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          username: user.displayName,
          email: user.email,
          createdat: serverTimestamp(),
        })
      }
      // navigate('/')
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Button
    type="submit"
    fullWidth
    variant="contained"
      sx={{
        backgroundColor: "white",
        color: "#000",
        borderRadius: "5px",
        boxShadow: "0 3px 4px rgba(0,0,0,0.25)",
        fontSize: "16px",
        cursor: "pointer",
      }}
      onClick={googleSignIn}
    >
      <GoogleIcon sx={{paddingRight:"5px"}}/>
      <p> Sign In with Google</p>
    </Button>
  );
}
