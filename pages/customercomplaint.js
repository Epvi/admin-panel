import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getData, useComplaint } from "../auth/complaintReducer";
import { useEffect } from "react";
import Layout from "../components/Layout";
const userRole = "admin";

export default function ComplaintTables() {
  const { complaintState, complaintDispatch } = useComplaint();

  const complaint = [];
  useEffect(() => {
    getData(complaintDispatch, complaint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        style={{
          marginRight: "15px",
          marginTop: "15px",
          height: "85vh",
          width: "100%",
        }}
      >
        
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell sx={{ width: "5vw" }} align="center">
                  Sr.
                </TableCell>
                <TableCell sx={{ width: "15vw" }} align="center">
                  userID
                </TableCell>
                <TableCell sx={{ width: "15vw" }} align="center">
                  Phone no.
                </TableCell>
                <TableCell sx={{ width: "15vw" }} align="center">
                  Date
                </TableCell>
                <TableCell sx={{ width: "35vw" }} align="center">
                  Complaint Text
                </TableCell>
                <TableCell sx={{ width: "15vw" }} align="center">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaintState.complaint?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="center" component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="center">{row.userID}</TableCell>
                  <TableCell align="center">
                    {row.phoneNo}
                  </TableCell>
                  <TableCell align="center">
                    {row.time.toDate().toString().slice(4, 15)}
                  </TableCell>
                  <TableCell align="center">
                    {row.complaintText}
                  </TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

ComplaintTables.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
