import React from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import '../firebaseConfig'
import { authenticateUser } from '../auth/userlogin'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebaseConfig"

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
  const formik = useFormik({
    initialValues: {
      email: "rs@gmail.com",
      password: "13456789",
    },
    onSubmit: () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
      
      createUserWithEmailAndPassword( auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          authenticateUser()
          Router.push('/home')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(errorCode)          
        });
      console.log("Submitted");
    },
  });

  return (
    <div>
      <form
        style={{ width: "50%", margin: "auto", marginTop: "100px" }}
        onSubmit={formik.handleSubmit}
      >
        <p style={{ textAlign: "center" }}>Enter your details</p>
        <div style={{ margin: "20px 0" }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div style={{ margin: "20px 0" }}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div style={{ margin: "20px 0" }}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WithMaterialUI;
