import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { getData, useDashboard } from "../auth/dashboardData";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function DashboardData() {
  const { dashboardState, dashboardDispatch } = useDashboard();
  const totalData = {};
  useEffect(() => {
    getData(dashboardDispatch, totalData);
  }, []);

 
  return (
    <>
      {dashboardState.totalData?(<Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "inherit",
          marginTop: "20px",
          alignItems: "center",
          justifyContent: "space-evenly",
          color: "white",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#7978E9",
            padding: "15px 40px",
            width: "23%",
            height: "160px",
            borderRadius: "25px",
          }}
        >
          <Typography sx={{ fontSize: "18px" }}>Total Users</Typography>
          <Typography sx={{ fontSize: "50px" }}>
            {dashboardState.totalData.totalUsers}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#7978E9",
            padding: "15px 40px",
            width: "23%",
            height: "160px",
            borderRadius: "25px",
          }}
        >
          <Typography sx={{ fontSize: "18px" }}>Total Devices</Typography>
          <Typography sx={{ fontSize: "50px" }}>
            {dashboardState.totalData.totalDevices}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#7978E9",
            padding: "15px 40px",
            width: "23%",
            height: "160px",
            borderRadius: "25px",
          }}
        >
          <Typography sx={{ fontSize: "18px" }}>Average Devices</Typography>
          <Typography sx={{ fontSize: "50px" }}>
            {dashboardState.totalData.averageDevices}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#7978E9",
            padding: "15px 40px",
            width: "23%",
            height: "160px",
            borderRadius: "25px",
          }}
        >
          <Typography sx={{ fontSize: "18px" }}>Device ID</Typography>
          <Typography sx={{ fontSize: "50px" }}>
            {dashboardState.totalData.deviceID}
          </Typography>
        </Box>
      </Box>):(<CircularProgress sx={{marginLeft:"45%",marginTop:"20px"}}/>)}
    </>
  );
}
