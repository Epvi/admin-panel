import * as React from "react";
import Router from "next/router";
 import CircularProgress from "@mui/material/CircularProgress";
 import { DataGrid } from "@mui/x-data-grid";
 import { getData, useservice , deleteServiceRequest} from "../auth/serviceReducer";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Button from "@material-ui/core/Button";
import {getFirestore, doc, deleteDoc } from "firebase/firestore";
const userRole = "admin";


 function serviceTables() {
  const { serviceState, serviceDispatch } = useservice();


  useEffect(() => {
    getData(serviceDispatch);
  }, []);

  function handleClick(selectedID) {

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
            
            
            onClick={() => {
              handleClick(cellValues.row.ref);
            }}
          >
            DELETE
          </button>
        );
      }
    }
  ];

  return (
    <>
      <div
        style={{
          marginRight: "15px",
          marginTop: "20px",
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

