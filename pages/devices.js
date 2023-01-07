import * as React from "react";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { getData, useDevices } from "../auth/devicesReducer";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import { useRoomPins } from "../auth/roomPinsReducer";
import { withProtected } from "../src/hooks/routes";
const userRole = "admin";

function Devices() {
  const { deviceState, deviceDispatch } = useDevices();
  const { pinState, pinDispatch } = useRoomPins();
  const deviceArray = [];
  useEffect(() => {
    getData(deviceDispatch, deviceArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (selectedDevice) => {
    pinDispatch({ type: "UPDATE", payload: selectedDevice });
    Router.push("/devices/setuppins");
  };
  const columns = [
    { field: "id", headerName: "Sr", flex: 0.3 },
    { field: "device", headerName: "Device", flex: 1 },
    { field: "pin1", headerName: "Pin 1", flex: 1 },
    {
      field: "pin2",
      headerName: "Pin 2",
      flex: 1,
    },
    {
      field: "pin3",
      headerName: "Pin 3",
      flex: 1,
    },
    {
      field: "pin4",
      headerName: "Pin 4",
      flex: 1,
    },
    {
      field: "pin5",
      headerName: "Pin 5",
      flex: 1,
    },
    {
      field: "pin6",
      headerName: "Pin 6",
      // description: "Cannot be sorted",
      // sortable: false,
      Flex: 1,
    },
    {
      field: "details",
      headerName: "Details",
      width: 130,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClick(cellValues.row.device);
            }}
          >
            Setup Pin
          </Button>
        );
      },
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
        {deviceState.deviceArray ? (
          <DataGrid
            getRowId={(row) => row.id}
            getRowHeight={() => "auto"}
            rows={deviceState.deviceArray.map((row, index) => ({
              id: index,
              device: row.id,
              pin1: row["Pin 1"],
              pin2: row["Pin 2"],
              pin3: row["Pin 3"],
              pin4: row["Pin 4"],
              pin5: row["Pin 5"],
              pin6: row["Pin 6"],
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

Devices.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};

export default withProtected(Devices);
