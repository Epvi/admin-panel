import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
const Table = dynamic(() => import("../pages/tables"), {
  suspense: true,
});
export default function SimpleContainer() {
  return (
    <React.Fragment>
      <Box sx={{ display:"flex",
      flexDirection:"row",
      width:"inherit",
      marginLeft:"20px"}}>
      <Box
        sx={{
          backgroundColor: "pink",
          height: "50vh",
          width: "50vw",
          marginTop: "24px",
          borderRadius: "25px",
          padding: "10px",
        }}
      >
        <Typography>Hello</Typography>
      </Box>
      <Box
        sx={{
          height: "50vh",
          width: "50vw",
          marginTop: "24px",
          padding: "10px",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box
            sx={{
              backgroundColor: "Pink",
              padding: "15px",
              width: "47%",
              height: "23vh",
              borderRadius: "25px",
            }}
          >
            Hello
          </Box>
          <Box
            sx={{
              backgroundColor: "Pink",
              padding: "15px",
              marginLeft: "30px",
              width: "47%",
              height: "23vh",
              borderRadius: "25px",
            }}
          >
            Hello
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "Pink",
              padding: "15px",
              width: "47%",
              height: "23vh",
              borderRadius: "25px",
            }}
          >
            Hello
          </Box>
          <Box
            sx={{
              backgroundColor: "Pink",
              padding: "15px",
              marginLeft: "30px",
              width: "47%",
              height: "23vh",
              borderRadius: "25px",
            }}
          >
            Hello
          </Box>
        </Box>
      </Box>
      </Box>
      <Table/>
    </React.Fragment>
  );
}
