import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getData, useUser } from "../auth/userReducer";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useState } from "react";

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

export default function UsersData() {
  const { state, dispatch } = useUser();

  const userArray = [];
  useEffect(() => {
    getData(dispatch, userArray);
  }, []);
  const [value, setValue] = useState('Chonse');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <div style={{ marginRight: "15px" }}>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Users</h1>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: "5vw" }} align="center">
                  Sr.
                </StyledTableCell>
                <StyledTableCell sx={{ width: "25vw" }} align="center">
                  Name
                </StyledTableCell>
                <StyledTableCell sx={{ width: "25vw" }} align="center">
                  Email
                </StyledTableCell>

                <StyledTableCell sx={{ width: "25vw" }} align="center">
                  Smifis
                </StyledTableCell>
                <StyledTableCell sx={{ width: "20vw" }} align="center">
                  Subscribed
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.userArray?.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Dropdown
                      label={row.smifis}
                      value={value}
                      onChange={handleChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.subscribed ? "True" : "False"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
const Dropdown = ({ label, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {label.map((option,i) => (
        <option key={i} value={option}>{option}</option>
      ))}
    </select>
  );
};
const userRole = "admin";
UsersData.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
