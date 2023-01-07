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
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { doc, deleteDoc } from "firebase/firestore";
import { collection, getDocs, getDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { withProtected } from "../src/hooks/routes";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const validationSchema = yup.object({
  outlined: yup.string("Enter your deviceid").required("Deviceid is required"),
});
const Sub = () => {
  const { subState, subDispatch } = useSub();
  const [subscribeButton, setSubscribeButton] = useState(false);
  const [subscribeText, setSubscribeText] = useState("Connect");
  const [serverStatus, setServerStatus] = useState("");
  const options = {
    method: "GET",
    url: "http://35.154.220.124:8080/mqttCheck",
  };
  axios
    .request(options)
    .then(function (response) {
      if (response.data) {
        setServerStatus("Success");
      } else {
        setServerStatus("Failure");
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  let device;
  const formik = useFormik({
    initialValues: {
      outlined: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSubscribeText("Connecting");
      setSubscribeButton(true);
      device = values.outlined;
      console.log(device);
      const options = {
        method: "GET",
        url: "https://adminpanelbackendepvi.herokuapp.com/subscribe",
        headers: { deviceid: device },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setSubscribeText("Connected");
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
  let obj;
  const handleClick = () => {
    const colRef = collection(database, "SubscribeData");
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((document) => {
        deleteDoc(doc(database, "SubscribeData", document.id));
      });
    });
  };
  const handleClickTwo = () => {
    const options = {
      method: "GET",
      url: "https://adminpanelbackendepvi.herokuapp.com/unsubscribe",
    };

    axios
      .request(options)
      .then(function (response) {
        setSubscribeText("Connect");
        setSubscribeButton(false);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  subState.sub
    ? subState.sub.sort((a, b) => a.sortingindex - b.sortingindex)
    : null;
  return (
    <Layout userRole={"admin"}>
      <div style={{ margin: "auto", marginTop: "40px" }}>
        <p>{serverStatus}</p>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            style={{
              width: "60%",
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "10px",
            }}
            id="outlined"
            variant="outlined"
            name="outlined"
            placeholder="Enter one or more device ids separated with commas"
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
            disabled={subscribeButton}
          >
            {subscribeText}
          </Button>
          <Button
            sx={{ top: "18px", marginLeft: "10px" }}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Clear Data
          </Button>
          <Button
            sx={{ top: "18px", marginLeft: "10px" }}
            variant="contained"
            color="primary"
            onClick={handleClickTwo}
          >
            Disconnect
          </Button>
        </form>
        <div style={{ marginRight: "10px" }}>
          {subState.sub ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ width: "5vw" }} align="center">
                      <p>Sr. No</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "10vw" }} align="center">
                      <p>Smifi</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "3vw" }} align="center">
                      <p>Wifi</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "12vw" }} align="center">
                      <p>Pin 1</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "12vw" }} align="center">
                      <p>Pin 2</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "12vw" }} align="center">
                      <p>Pin 4</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "12vw" }} align="center">
                      <p>Pin 3</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "12vw" }} align="center">
                      <p>Pin 5</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "12vw" }} align="center">
                      <p>Pin 6</p>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subState.sub.map(
                    (row, index) => (
                      (obj = JSON.parse(row.data)),
                      (
                        <StyledTableRow key={index}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            <p>{index + 1}</p>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <p>{row.smifi}</p>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <p>{row.wifi}</p>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {obj.onoff1 == 1 ? (
                              <p style={{ color: "green" }}>on</p>
                            ) : (
                              <p style={{ color: "red" }}>off</p>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {obj.onoff2 == 1 ? (
                              <p style={{ color: "green" }}>on</p>
                            ) : (
                              <p style={{ color: "red" }}>off</p>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {obj.onoff3 == 1 ? (
                              <p style={{ color: "green" }}>on</p>
                            ) : (
                              <p style={{ color: "red" }}>off</p>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {obj.onoff4 == 1 ? (
                              <p style={{ color: "green" }}>on</p>
                            ) : (
                              <p style={{ color: "red" }}>off</p>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {obj.onoff5 == 1 ? (
                              <p style={{ color: "green" }}>on</p>
                            ) : (
                              <p style={{ color: "red" }}>off</p>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {obj.onoff6 == 1 ? (
                              <p style={{ color: "green" }}>on</p>
                            ) : (
                              <p style={{ color: "red" }}>off</p>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <CircularProgress sx={{ marginLeft: "45%", marginTop: "15px" }} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withProtected(Sub);
const userRole = "admin";
Sub.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
