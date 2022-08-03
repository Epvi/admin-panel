import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { getData, useUser } from "../auth/userReducer";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { autocompleteClasses, colors } from "@mui/material";
import { height, padding } from "@mui/system";
import { blue } from "@mui/material/colors";
import { TextField } from "@material-ui/core";

export default function UsersData() {
  const { userState, userDispatch } = useUser();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [index, setIndex] = useState();
  const [pop, setPop] = useState(false);

  function popUp(id) {
    setPop((pValue) => {
      return !pValue;
    });
    setIndex(id);
  }

  function changeTitle(e) {
    const title = e.target.value;
    setTitle(title);
  }

  function changeBody(e) {
    const body = e.target.value;
    setBody(body);
  }

  function handleClick(e, id) {
    e.preventDefault();
    const token = userState.userArray[index].tokens;
    const name = userState.userArray[index].name;
    console.log(title);
    console.log(body);
    console.log(token[token.length - 1]);
    console.log(name);
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
      {pop && (
        <>
          <div
            onClick={popUp}
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: "1",
              display: "flex",
              position: "absolute",
              top: "0",
              left: "0",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "0",
              left: "0",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <div
              style={{
                display:"flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: "2",
                marginTop: "30px",
                marginRight: "50px",
                height: "200px",
                border: "none",
                boxSizing: "border-box",
                display:"flex",
                flexDirection:"column",
                width: "400px",
                borderRadius: "10px",
                backgroundColor: "white",
                Transition: "all 4s ease-out",
                TransitionProperty: "color,background-color",

              }}
            >
              <form>
                <TextField
                  type="text"
                  label="Title"
                  onChange={changeTitle}
                  style={{
                    display:"block",
                    margin:"auto"

                  }}
                />
                <TextField
                  type="text"
                  onChange={changeBody}
                  label="Body"
                  style={{
                    display:"block",
                    margin:"auto"
                  }}
                />
                <button
                  onClick={handleClick}
                  style={{
                    cursor: "pointer",
                    borderRadius: "4px",
                    marginTop: "5px",
                    marginLeft: "10px",
                    border:"none",
                    boxShadow:"2px 2px 2px 2px rgba(0,0,0,0.2)", 
                    alignItems:"center",
                    marginLeft:"auto",
                    marginRight:"auto",
                    marginTop:"20px",
                    backgroundColor:"#556cd6",
                    height:"25px",
                    width:"70px",
                    display:"block",
                    color:"white"
                    
                    
                  
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}

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
            onRowClick={(rowData) => popUp(rowData.id)}
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
