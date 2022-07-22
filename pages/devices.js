
import * as React from "react";
import Router from "next/router";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getData, useDevices } from "../auth/devicesReducer";
import { useEffect } from "react";
import Button from '@mui/material/Button';
import Layout from "../components/Layout";
import { useRoomPins } from "../auth/roomPinsReducer";
const userRole = "admin";

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

export default function Devices() {
  const { deviceState, deviceDispatch } = useDevices();
  const {pinState,pinDispatch} = useRoomPins();
  const deviceArray = [];
  useEffect(() => {
    getData(deviceDispatch, deviceArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
 
const handleClick = (selectedDevice)=>{
  pinDispatch({type:"UPDATE",payload:selectedDevice});
  Router.push('/devices/setuppins');
}

  
  return (
    <>
      <div style={{ marginRight: "15px" }}>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          Devices Data
        </h1>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: "4vw" }} align="center">
                  Sr.
                </StyledTableCell>
                <StyledTableCell sx={{ width: "16vw" }} align="center">
                  Pin 1
                </StyledTableCell>
                <StyledTableCell sx={{ width: "16vw" }} align="center">
                  Pin 2
                </StyledTableCell>
                <StyledTableCell sx={{ width: "16vw" }} align="center">
                  Pin 3
                </StyledTableCell>
                <StyledTableCell sx={{ width: "16vw" }} align="center">
                  Pin 4
                </StyledTableCell>
                <StyledTableCell sx={{ width: "16vw" }} align="center">
                 Pin 5
                </StyledTableCell>
                <StyledTableCell sx={{ width: "16vw" }} align="center">
                 Pin 6
                </StyledTableCell>
                <StyledTableCell sx={{ width: "16vw" }} align="center">
                  Details
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deviceState.deviceArray?.map((row,index)=>(
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                      {index}        
                  </StyledTableCell>
                  <StyledTableCell align="center">{row["Pin 1"]}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row["Pin 2"]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row["Pin 3"]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row["Pin 4"]}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row["Pin 5"]}</StyledTableCell>
                  <StyledTableCell align="center">{row["Pin 6"]}</StyledTableCell>
                  <StyledTableCell align="center"><Button onClick={()=>{handleClick(row.id)}} variant="contained">Setup Pin</Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       
      </div>
    </>
  );
}

Devices.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
