import React from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().min(8,"Password must have 8 characters").required("This field is required"),
  changepassword: yup.string().required("This field is required").when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
});

const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      changepassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const email = formik.values.email;
      const password = formik.values.password;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          Router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(errorMessage);
        });
    },
  });

  return (
    <>
      <div
        style={{
          width: "50%",
          marginLeft: "37%",
        }}
      >
        <h3 style={{ marginTop: "15vh", marginBottom: "30px", color: "black" }}>
          Please Enter your details.
        </h3>

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
            onBlur={formik.handleBlur}
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
            name="password"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            placeholder="Enter your password"
          />
          <p style={{ fontSize: "14px" }}>Confirm Password</p>
          <TextField
            style={{ width: "50%" }}
            fullWidth
            type="password"
            name="changepassword"
            value={formik.values.changepassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.changepassword &&
              Boolean(formik.errors.changepassword)
            }
            helperText={
              formik.touched.changepassword && formik.errors.changepassword
            }
            variant="outlined"
            placeholder="Confirm Password"
          />
          <Button
            style={{ width: "50%", marginTop: "25px", borderRadius: "5px" }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </div>
    </>
  );
};

export default WithMaterialUI;
