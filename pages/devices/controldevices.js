import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
// const axios = require("axios").default;

const ControlDevices = () => {
  // const [connectBroker, setConnectBroker] = useState("CONNECT");
  //   const handleConnect = ()=> {
  //     // console.log("Hello")
  //     setConnectBroker("CONNECTING")
  //     axios
  //     .get("https://adminpanelbackendforapi.herokuapp.com/connect")
  //     .then(function (response) {
  //       // handle success
  //       console.log("Success");
  //       console.log("Response",response.data);
  //       setConnectBroker("CONNECTED");
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //   }
  //   const handleDisconnect = ()=> {
  //     // console.log("Hello")
  //     axios
  //     .get("https://adminpanelbackendforapi.herokuapp.com/disconnect")
  //     .then(function (response) {
  //       // handle success
  //       console.log("Response",response.data);
  //       setConnectBroker("CONNECT");
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //   }
  return (
    <><div style={{ marginRight: "15px" }}>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Control Devices
      </h1>
      {/* <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <h3 style={{ marginTop: "5px" }}>
          Connect your device : &nbsp;&nbsp;&nbsp;
        </h3>
        <Button disabled={connectBroker=="CONNECT"||connectBroker=="CONNECTING"?false:true } onClick={handleConnect} variant="contained">
          {connectBroker}
        </Button>
        <Button sx={{ marginLeft: "10px" }} onClick={handleDisconnect} disabled={(connectBroker=="CONNECT"||connectBroker=="CONNECTING")?true:false} variant="contained">
        Disconnect
      </Button>
    </div><div style={{ display: "flex", justifyContent: "center", marginTop: "15px", marginRight: "65px" }}> */}
        <h3 style={{ marginTop: "5px" }}>
          Switch : &nbsp;
        </h3>
        <Switch />
      </div>
      </>
  );
};

export default ControlDevices;
const userRole = "admin";
ControlDevices.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
