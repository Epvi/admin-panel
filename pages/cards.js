import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { getData, useDashboard } from "../auth/dashboardData";
import { Typography } from "@mui/material";

export default function DashboardData() {
  const { state, dispatch } = useDashboard();
  const totalData = {};
  useEffect(() => {
    getData(dispatch, totalData);
  }, []);

  const handleChange = () => {
    dispatch({ type: "ONE", payload: i.deviceID });
  };
  return (
    <>
      <Box
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
            {state.totalData?.totalUsers}
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
            {state.totalData?.totalDevices}
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
            {state.totalData?.averageDevices}
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
            {state.totalData?.deviceID}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
