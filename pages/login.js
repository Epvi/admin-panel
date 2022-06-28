import React from 'react';
import Router from "next/router"
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { authenticateUser } from '../auth/userlogin'
import '../firebaseConfig'
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebaseConfig"


const validationSchema = yup.object({
    email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
      signInWithEmailAndPassword(auth, email, password)
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
    alert(errorCode)
  });
     
    },
  });

  const handleClick=()=>{
    Router.push('/signup')
  }
 
  return (

    <div>
      <form style={{width:"50%",margin:"auto",marginTop:"80px"}} onSubmit={formik.handleSubmit}>
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
       
        <Button color="primary" variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>
      <div style={{width:"50%",margin:"auto",marginTop:"30px"}}>
      <Button  color="primary" variant="contained" fullWidth onClick={handleClick}>
          Signup
        </Button>
        </div>
    </div>
  );
};

export default WithMaterialUI
