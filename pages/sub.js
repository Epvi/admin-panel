import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { getData, useSub } from "../auth/subReducer";
import { database } from "../firebaseConfig";
import Layout from "../components/Layout";
import { TextField } from "@material-ui/core";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { doc, deleteDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const validationSchema = yup.object({
  outlined: yup.string("Enter your deviceid").required("Deviceid is required"),
});
const Sub = () => {
  const { subState, subDispatch } = useSub();
  // const [flag, setFlag] = useState(false);
  let device;
  const formik = useFormik({
    initialValues: {
      outlined: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      device = values.outlined;
      const options = {
        method: "GET",
        url: "http://localhost:3001/subscribe",
        headers: { deviceid: device },
      };
      axios
        .request(options)
        .then(function (response) {
          let payloadData = response.data;
          // console.log(payloadData);
          // setFlag(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  });

  // if (flag) {
  const sub = [];
  useEffect(() => {
    getData(subDispatch, sub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let obj,objDiv;
  const handleClick = async () =>{
    const colRef = collection(database, "SubscribeData");
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((document) => {
       deleteDoc(doc(database, "SubscribeData",document.id));
      });
    });
  }
  return (
    <div style={{margin: "auto", marginTop: "40px" }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          style={{ width: "50%", margin: "10px" }}
          id="outlined"
          variant="outlined"
          name="outlined"
          placeholder="Enter device id"
          value={formik.values.outlined}
          onChange={formik.handleChange}
          error={formik.touched.outlined && Boolean(formik.errors.outlined)}
          helperText={formik.touched.outlined && formik.errors.outlined}
        />
        <Button
          sx={{ top: "18px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Subscribe
        </Button>
      <Button
          sx={{ top: "18px" ,marginLeft:"10px"}}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Clear Data
        </Button>
      </form>
      {/* <div style={{height:"700px",overflow:"scroll"}}id="scroll"> */}
      {subState.sub ? (
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{width:"5vw"}}>Sr. No</StyledTableCell>
                    <StyledTableCell sx={{width:"15vw"}}align="center">Pin 1</StyledTableCell>
                    <StyledTableCell sx={{width:"15vw"}}align="center">Pin 2</StyledTableCell>
                    <StyledTableCell sx={{width:"15vw"}}align="center">Pin 4</StyledTableCell>
                    <StyledTableCell sx={{width:"15vw"}}align="center">Pin 3</StyledTableCell>
                    <StyledTableCell sx={{width:"15vw"}}align="center">Pin 5</StyledTableCell>
                    <StyledTableCell sx={{width:"15vw"}}align="center">Pin 6</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subState.sub.map((row,index) => (
                    obj = JSON.parse(row.data),
                    <StyledTableRow key={row.dataNumber}>
                      <StyledTableCell component="th" scope="row">
                        {index}
                      </StyledTableCell>
                      <StyledTableCell align="center">{obj.onoff1==1?"on":"off"}</StyledTableCell>
                      <StyledTableCell align="center">{obj.onoff2==1?"on":"off"}</StyledTableCell>
                      <StyledTableCell align="center">{obj.onoff3==1?"on":"off"}</StyledTableCell>
                      <StyledTableCell align="center">{obj.onoff4==1?"on":"off"}</StyledTableCell>
                      <StyledTableCell align="center">{obj.onoff5==1?"on":"off"}</StyledTableCell>
                      <StyledTableCell align="center">{obj.onoff6==1?"on":"off"}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      ) : (
        <CircularProgress sx={{ marginLeft: "45%", marginTop: "15px" }} />
        )}
        {/* </div> */}
    </div>
  );
};

export default Sub;
const userRole = "admin";
Sub.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
