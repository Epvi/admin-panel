import * as React from "react";
import Router from "next/router";
 import CircularProgress from "@mui/material/CircularProgress";
 import { DataGrid } from "@mui/x-data-grid";
 import { getData, useservice , deleteServiceRequest, addServiceRequests, updateServiceRequests} from "../auth/serviceReducer";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { color } from "@mui/system";
const userRole = "admin";


 function serviceTables() {
  const { serviceState, serviceDispatch } = useservice();
  const [pop, setPop] = useState();
  const [update, setupdate] = useState();

  const [id, setid] = useState()

  const [date, setdate] = useState();
  const [premise, setpremise] = useState();

  const [newDate, setnewdate] = useState();
  const [newPremise, setnewpremise] = useState();


function popUp() {
  setPop((pValue) => {
    return !pValue;
  });
}

function updatePopup(id) {
  setupdate((pValue) => {
    return !pValue;
  });
  setid(id)
}


function changedate (e) {
  let dateValue = e.target.value;
  setdate(dateValue);
}

function changepremise (e) {
  let premiseValue = e.target.value;
  setpremise(premiseValue);
}

function updatedate (e) {
  let newdateValue = e.target.value;
  setnewdate(newdateValue);
}

function updatepremise (e) {
  let newpremiseValue = e.target.value;
  setnewpremise(newpremiseValue);
}


 function handleAdd(e) {

  e.preventDefault();

  addServiceRequests(date,premise)

  setPop(false);
  getData(serviceDispatch);
};

function handleUpdate(e) {
  e.preventDefault();
  updateServiceRequests(newDate, newPremise, id)
  setupdate(false);
  getData(serviceDispatch);
}


  useEffect(() => {
    getData(serviceDispatch);
  }, []);

  function handleDelete(selectedID) {

    deleteServiceRequest(serviceDispatch,selectedID)
    getData(serviceDispatch);
  };

  const columns = [
    { field: "id", headerName: "Sr", flex: 1},
    { field: "date", headerName: "date",flex: 1},
    { field: "premise", headerName: "premise",flex: 1 },
    
  
  
    {
      field: "ACTION",flex: 1,
      headerName:"ACTION",
      width:130,
      renderCell: (cellValues) => {
        return (

          
          <button
            
          style={{backgroundColor:'#556cd6',border:"none",height:"32px",width:"80px",color:'white',borderRadius:"4px",boxShadow: "1px 1px 9px 5px rgba(0,0,0.2,0.2)",cursor:'pointer'}}
            
            onClick={() => {
              handleDelete(cellValues.row.ref);
            }}
          >
            DELETE
          </button>
          
        );
      }
    },
    {
      field: "UPDATE",flex: 1,
      headerName:"UPDATE",
      width:130,
      renderCell: (cellValues) => {
        return (
          <button
            style={{backgroundColor:'#556cd6',border:"none",height:"32px",width:"80px",color:'white',borderRadius:"4px",boxShadow: "1px 1px 9px 5px rgba(0,0,0.2,0.2)",cursor:"pointer"}}
            
            onClick={() => {
              updatePopup(cellValues.row.ref);
            }}
          >
            UPDATE
          </button>

        );
      }
    }
  ];

  return (
    <>
<div style={{display:'flex', justifyContent: 'center', width:'100%',marginTop:"10px"}}>
<button style={{marginTop:"20px",backgroundColor:'#556cd6',border:"none",width:'105px',height:'34px',color:'white',borderRadius:"4px",boxShadow: "1px 3px 9px 5px rgba(0,0,0.2,0.2)",cursor:'pointer'}}  onClick={popUp}>ADD</button>
</div>
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
                display: "flex",
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
                display: "flex",
                flexDirection: "column",
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
                  label="date"
                  onChange={changedate}
                  style={{
                    display: "block",
                    margin: "auto",
                  }}
                />
                <TextField
                  type="text"
                  onChange={changepremise}
                  label="premise"
                  style={{
                    display: "block",
                    margin: "auto",
                  }}
                />
                <button
                  onClick={handleAdd}
                  style={{
                    cursor: "pointer",
                    borderRadius: "4px",
                    marginTop: "5px",
                    marginLeft: "10px",
                    border: "none",
                    boxShadow: "1px 3px 9px 5px rgba(0,0,0.2,0.2)",

                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                    backgroundColor: "#556cd6",
                    height: "25px",
                    width: "70px",
                    display: "block",
                    color: "white",
                  }}
                >
                  ADD
                </button>
              </form>
            </div>
          </div>
        </>
      )}

{update && (
        <>
          <div
          onClick={updatePopup}
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
                display: "flex",
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
                display: "flex",
                flexDirection: "column",
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
                  label="date"
                  onChange={updatedate}
                  style={{
                    display: "block",
                    margin: "auto",
                  }}
                />
                <TextField
                  type="text"
                  onChange={updatepremise}
                  label="premise"
                  style={{
                    display: "block",
                    margin: "auto",
                  }}
                />
              <div>
                <button 
                  onClick={handleUpdate}
                  style={{
                    cursor: "pointer",
                    borderRadius: "4px",
                    marginTop: "5px",
                    marginLeft: "10px",
                    border: "none",
                    boxShadow: "1px 3px 9px 5px rgba(0,0,0.2,0.2)",

                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                    backgroundColor: "#556cd6",
                    height: "25px",
                    width: "70px",
                    display: "block",
                    color: "white",
                  }}
                >
                  UPDATE
                </button>
              </div>
              </form>
            </div>
          </div>
        </>
      )}


      <div
        style={{
          marginRight: "15px",
          marginTop: "50px",
           height: "85vh",
           width: "100%",

        }}
      >


        {serviceState.service ? (
          <DataGrid
            getRowId={(row) => row.id}
            getRowHeight={() => 'auto'}
            rows={serviceState.service.map((row, index) => ({
              id: index,
              date: row.date,
              premise: row.premise,
              ref: row.id

            }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection



          />
        ) : (
          <CircularProgress sx={{ marginLeft: "45%",marginTop:"15px" }} />
        )}




      </div>
    </>
  );
}


 
serviceTables.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};

export default serviceTables;

