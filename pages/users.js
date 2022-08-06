import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { getData, useUser } from "../auth/userReducer";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { autocompleteClasses, colors, Link } from "@mui/material";
import { height, padding } from "@mui/system";
import { blue } from "@mui/material/colors";
import { TextField } from "@material-ui/core";
import userdetails from "./users/usersdetail";
import Router from "next/router";


export default function UsersData() {
  const { userState, userDispatch } = useUser();
  function userDetails(index) {
    
    Router.push({
      pathname: '/users/usersdetail',
      query: {
        name: userState.userArray[index].name,
        email: userState.userArray[index].email,
        smifis: userState.userArray[index].smifis,
        subscribed: userState.userArray[index].subscribed,
        token:userState.userArray[index].tokens
      }
  }, '/users/usersdetail')
  }

  

  const userArray = [];
  useEffect(() => {
    getData(userDispatch, userArray);
  }, []);
  const [value, setValue] = useState("Choose");

  const columns = [
    { field: "id", headerName: "Sr", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "smifis",
      headerName: "Smifis",
      flex: 1,
      // renderCell: (cellValues) => {
      //   return (
      //     <Dropdown label={cellValues} value={value} onChange={handleChange} />
      //   );
      // },
    },
    {
      field: "subscribed",
      headerName: "Subscribed",
      flex: 1,
    },
  ];
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

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
        {userState.userArray ? (
          <DataGrid
            getRowId={(row) => row.id}
            getRowHeight={() => "auto"}
            rows={userState.userArray.map((row, index) => ({
              id: index,
              name: row.name,
              email: row.email,
              smifis: row.smifis + " ",
              subscribed: row.subscribed ? "True" : "False",
            }))}
 

          

            onRowClick={(rowData) => userDetails(rowData.id)}


            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            //checkboxSelection
          />
        ) : (
          <CircularProgress sx={{ marginLeft: "45%", marginTop: "15px" }} />
        )}
        {/* <TableContainer component={Paper}>
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
              {userState.userArray?.map((row, index) => (
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
        </TableContainer> */}

      </div>
    </>
  );
}
// const Dropdown = ({ label, value, onChange }) => {
//   return (
//     <select value={value} onChange={onChange}>
//       {label?.map((option, i) => (
//         <option key={i} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   );
// };
const userRole = "admin";
UsersData.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
