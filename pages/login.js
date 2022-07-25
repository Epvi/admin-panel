import React, { useEffect } from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../auth/AuthContext';

import Link from "next/link";


const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const WithMaterialUI = () => {
  // const { state } = useCount();
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) 
      Router.push('/')
    },[currentUser]);
  // const { dispatch } = useCount();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const email = formik.values.email;
      const password = formik.values.password;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const userData = userCredential.user;
          // ...
          // console.log(userData);
          
          if (currentUser) {
            Router.push('/')
        }
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    },
  });

  

  return (
    <>
      <div
        style={{
          width:"50%",
          marginLeft:"37%"
        }}
      >
        <h1 style={{ marginTop: "15vh" }}>Welcome to EPVI</h1>
        <p style={{ marginTop: "25px", marginBottom: "30px", color: "grey" }}>
          Please Enter your details.
        </p>

        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={formik.handleSubmit}
        >
          <p style={{ fontSize: "14px" }}>Email</p>
          <TextField
            style={{ width: "50%" }}
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            placeholder="Enter your email"
          />
          <p style={{ fontSize: "14px" }}>Password</p>

          <TextField
            style={{ width: "50%" }}
            fullWidth
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            placeholder="Enter your password"
          />
          <Link href="/forgotPassword">
            <a
              style={{
                fontSize: "14px",
                color: "#3f51b5",
                marginLeft: "17%",
                marginTop: "15px",
              }}
            >
              Forgot password
            </a>
          </Link>
          <Button
            style={{ width: "50%", marginTop: "15px", borderRadius: "5px" }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Sign in
          </Button>
        </form>
        <p
          style={{
            fontSize: "14px",
            marginLeft: "10%",
            color: "grey",
            marginTop: "30px",
          }}
        >
          Don't have an account?{" "}
          <Link href="/signup">
            <a style={{ textDecoration: "none", color: "#3f51b5" }}>Sign up</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default WithMaterialUI;
