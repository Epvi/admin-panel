import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { getData, useUserInformation } from "../../auth/informationReducer";
import Layout from "../../components/Layout";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

const Information = () => {
    const { userInformationState, userInformationDispatch } = useUserInformation();
    const [userName, setUserName] = useState("Rishabh Saini")

  const { asPath, pathname } = useRouter();
  let phoneNo;
  const styling = {
    backgroundColor: "#556cd6",
    color: "white",
  };
    const userInformation = {};
    
  const handleClick = (index) =>{
      if(index==1) Router.push("/customerdata/information")
      if(index==2) Router.push("/customerdata/premise")
      if(index==3) Router.push("/customerdata/tracking")
      if(index==4) Router.push("/customerdata/service")
      if(index==5) Router.push("/customerdata/raiseticket")
    }
    const change = () =>{
        phoneNo = document.getElementById("outlined").value;
    }
    const submit = () =>{
        getData(userInformationDispatch, userInformation,phoneNo);
    }
    console.log(userInformationState.userInformation)
  return (
    <div
      style={{
        marginRight: "15px",
        marginTop: "15px",
        width: "100%",
        marginBottom:"20px"
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ marginLeft: "20px", color: "#556CD6" }}>
          Welcome &nbsp;&nbsp;{userName}
        </h2>
        <h3 style={{ marginLeft: "10vw" }}>Enter Customer Phone Number : </h3>
        <TextField
          style={{
            width: "20vw", marginLeft: "10px"
          }}
          id="outlined"
          variant="outlined"
          name="outlined"
          label="Phone"
          required
          onChange={change}
        />
        <Button
          sx={{ marginLeft: "5px", padding: "13px", width: "7vw" }}
          variant="contained"
          onClick={submit}
        >
          Search
        </Button>
      </div>
      <style jsx>{`
        .nav {
          background-color: #d9d9d9;
          width: 19%;
          display: flex;
          justify-content: center;
          padding-top: 15px;
          padding-bottom: 15px;
          cursor: pointer;
        }
      `}</style>
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          className="nav"
          onClick={()=>{handleClick(1)}}
          style={pathname === "/customerdata/information" ? styling : null}
        >
          Information
        </div>
        <div
          className="nav"
          onClick={()=>{handleClick(2)}}
          style={pathname === "/customerdata/premise" ? styling : null}
        >
          Premise
        </div>
        <div
          className="nav"
          onClick={()=>{handleClick(3)}}
          style={pathname === "/customerdata/tracking" ? styling : null}
        >
          Tracking
        </div>
        <div
          className="nav"
          onClick={()=>{handleClick(4)}}
          style={pathname === "/customerdata/service" ? styling : null}
        >
          Service
        </div>
        <div
          className="nav"
          onClick={()=>{handleClick(5)}}
          style={pathname === "/customerdata/raiseticket" ? styling : null}
        >
          Raise Ticket
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-around"}}>
      <div style={{display:"flex"}}>
       <p>User Name :&nbsp;</p>
       <p>Rishabh Saini</p>
      </div>
      <div>
      <Button
          sx={{ marginLeft: "5px", padding: "5px", width: "7vw" }}
          variant="contained"
        >
          Search
        </Button>
      </div>
      </div>
    </div>
  );
};
const userRole = "admin";
export default Information;
Information.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
