import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { getData, useComplaint } from "../auth/complaintReducer";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { withProtected } from "../src/hooks/routes";
const userRole = "admin";

function ComplaintTables() {
  const { complaintState, complaintDispatch } = useComplaint();

  const complaint = [];
  useEffect(() => {
    getData(complaintDispatch, complaint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { field: "id", headerName: "Sr", flex: 0.3 },
    { field: "userid", headerName: "userID", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "text",
      headerName: "Complaint Text",
      description: "Cannot be sorted",
      sortable: false,
      // width: 160,
      height: 2000,
      flex: 5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];
  return (
    <Layout userRole={"admin"}>
      <div
        style={{
          marginRight: "15px",
          marginTop: "15px",
          height: "85vh",
          width: "100%",
        }}
      >
        {complaintState.complaint ? (
          <DataGrid
            getRowId={(row) => row.id}
            getRowHeight={() => "auto"}
            rows={complaintState.complaint.map((row, index) => ({
              id: index,
              userid: row.userID,
              phone: row.phoneNo,
              date: row.time.toDate().toString().slice(4, 15),
              text: row.complaintText,
              status: row.status,
            }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        ) : (
          <CircularProgress sx={{ marginLeft: "45%", marginTop: "15px" }} />
        )}
      </div>
    </Layout>
  );
}

ComplaintTables.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};

export default withProtected(ComplaintTables);
