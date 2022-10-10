import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Layout from "../../components/Layout";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
const Premise = () => {
  // const { userInformationState, userInformationDispatch } = useUserInformation();
  const [userName, setUserName] = useState("Rishabh Saini");
  const [inputEdit, setInputEdit] = useState(true)
  const [val, setVal] = useState("epvi001")

  const { asPath, pathname } = useRouter();
  // let phoneNo=9999999999;
  const styling = {
    backgroundColor: "#556cd6",
    color: "white",
  };
  // const userInformation = {};

  const handleClick = (index) => {
    if (index == 1) Router.push("/customerdata/information");
    if (index == 2) Router.push("/customerdata/premise");
    if (index == 3) Router.push("/customerdata/tracking");
    if (index == 4) Router.push("/customerdata/service");
    if (index == 5) Router.push("/customerdata/raiseticket");
  };
  const change = () => {
    phoneNo = document.getElementById("outlined").value;
  };
  const handleEdit = () =>{
    setInputEdit(false)
  }
  const handleSubmit = () =>{
    setInputEdit(true)
  }
  const handleChange = () =>{
     setVal(document.getElementById("device").value);
  }
  return (
    <div
      style={{
        marginRight: "15px",
        marginTop: "20px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ marginLeft: "20px", color: "#556CD6" }}>
          Welcome &nbsp;&nbsp;{userName}
        </h2>
        <h3 style={{ marginLeft: "10vw" }}>Enter Customer Phone Number : </h3>
        <TextField
          style={{
            width: "20vw",
            marginLeft: "10px",
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
          // onClick={submit}
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
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          className="nav"
          onClick={() => {
            handleClick(1);
          }}
          style={pathname === "/customerdata/information" ? styling : null}
        >
          Information
        </div>
        <div
          className="nav"
          onClick={() => {
            handleClick(2);
          }}
          style={pathname === "/customerdata/premise" ? styling : null}
        >
          Premise
        </div>
        <div
          className="nav"
          onClick={() => {
            handleClick(3);
          }}
          style={pathname === "/customerdata/tracking" ? styling : null}
        >
          Tracking
        </div>
        <div
          className="nav"
          onClick={() => {
            handleClick(4);
          }}
          style={pathname === "/customerdata/service" ? styling : null}
        >
          Service
        </div>
        <div
          className="nav"
          onClick={() => {
            handleClick(5);
          }}
          style={pathname === "/customerdata/raiseticket" ? styling : null}
        >
          Raise Ticket
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "35px",
        }}
      >
        <div style={{ fontSize: "17px", fontWeight: "bold" }}>
          Smifi <br/>Information
        </div>
        <div
          style={{
            fontSize: "17px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            border:"1px solid black",
            padding:"5px"
          }}
        >
          <AddIcon />
          &nbsp;New<br/>Smi-Fi
        </div>
        <div style={{ fontSize: "17px", fontWeight: "bold" }}>Domain List</div>
        <div
          style={{
            fontSize: "17px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            border:"1px solid black",
            padding:"5px",
            marginLeft:"100px"
          }}
        >
          <AddIcon />
          &nbsp;New <br/>Room{" "}
        </div>
        <div
          style={{
            fontSize: "17px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <div>Domain Information Room 1 - Domain Name</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10vw",
              border:"1px solid black",
              padding:"5px"
            }}
          >
            <AddIcon />
            New Pin
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          // justifyContent:"center",
          // alignItems: "center",
          fontSize: "17px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ marginTop: "20px", marginLeft: "30px",display:"flex",alignItems:"center" }}>
            1{" "}
            <input
              type="text"
              id="device"
              value={val}
              onChange={handleChange}
              // readOnly={count==index?false:true}
              style={{
                marginLeft: "1vw",
                width: "8vw",
                border: "none",
                padding: "15px",
                paddingLeft: "20px",
                cursor:"pointer",
                // paddingRight: "-10px",
                backgroundColor: "#D9D9D9",
              }}
            />
            <div>
            <EditIcon onClick={()=>{handleEdit()}}sx={{marginLeft:"6px",padding:"3px",cursor:"pointer",backgroundColor:"#556CD6",color:"white"}}/>
            <FileDownloadDoneIcon onClick={()=>{handleSubmit()}}sx={{marginLeft:"6px",padding:"1px",backgroundColor:"#556CD6",color:"white",cursor:"pointer"}}/>
            </div>
      
          </div>
          <div style={{ marginTop: "20px", marginLeft: "30px",display:"flex",alignItems:"center" }}>
            1{" "}
            <input
              type="text"
              id="device"
              value={val}
              onChange={handleChange}
              readOnly={inputEdit}
              style={{
                marginLeft: "1vw",
                width: "8vw",
                border: "none",
                padding: "15px",
                paddingLeft: "20px",
                cursor:"pointer",
                // paddingRight: "-10px",
                backgroundColor: "#D9D9D9",
              }}
            />
            <div>
            <EditIcon onClick={()=>{handleEdit()}}sx={{marginLeft:"6px",padding:"3px",cursor:"pointer",backgroundColor:"#556CD6",color:"white"}}/>
            <FileDownloadDoneIcon onClick={()=>{handleSubmit()}}sx={{marginLeft:"6px",padding:"1px",backgroundColor:"#556CD6",color:"white",cursor:"pointer"}}/>
            </div>
      
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-around",
            alignItems: "center",
            marginLeft:"8vw"
          }}
        >
          <div style={{ marginTop: "20px",display:"flex",alignItems:"center"}}>
            1{" "}
            <input
              type="text"
              value="Living Room Lights" 
              readOnly={inputEdit}   
              style={{
                marginLeft: "1vw",
                cursor:"pointer",
                width: "15vw",
                border: "none",
                padding: "15px",
                paddingLeft: "20px",
                backgroundColor: "#D9D9D9",
              }}
            />
            <div>
            <EditIcon onClick={()=>{handleEdit()}}sx={{marginLeft:"6px",padding:"3px",cursor:"pointer",backgroundColor:"#556CD6",color:"white",cursor:"pointer"}}/>
            <FileDownloadDoneIcon onClick={()=>{handleSubmit()}}sx={{marginLeft:"6px",padding:"1px",backgroundColor:"#556CD6",color:"white",cursor:"pointer"}}/>
            </div>
          </div>
          <div style={{ marginTop: "20px",display:"flex",alignItems:"center"}}>
            1{" "}
            <input
              type="text"
              value="Living Room Lights" 
              readOnly={inputEdit}   
              style={{
                marginLeft: "1vw",
                cursor:"pointer",
                width: "15vw",
                border: "none",
                padding: "15px",
                paddingLeft: "20px",
                backgroundColor: "#D9D9D9",
              }}
            />
            <div>
            <EditIcon onClick={()=>{handleEdit()}}sx={{marginLeft:"6px",padding:"3px",cursor:"pointer",backgroundColor:"#556CD6",color:"white",cursor:"pointer"}}/>
            <FileDownloadDoneIcon onClick={()=>{handleSubmit()}}sx={{marginLeft:"6px",padding:"1px",backgroundColor:"#556CD6",color:"white",cursor:"pointer"}}/>
            </div>
          </div>
        </div>
        <div style={{
          display:"flex",
          flexDirection:"column",
          // justifyContent:"space-between",
          marginLeft: "6vw",

        }}>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            fontSize: "17px",
            background: "#D9D9D9",
            padding: "15px",
            marginTop: "20px",
            width: "41.5vw",
          }}
        >
          <div>Smifi 1 </div>
          <div>Pin 1</div>
          <div>Lights</div>
          <div>3</div>
          <div>100 W</div>
          <DeleteIcon />
          <DeleteIcon />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            fontSize: "17px",
            background: "#D9D9D9",
            padding: "15px",
            marginTop: "20px",
            width: "41.5vw",
          }}
        >
          <div>Smifi 1 </div>
          <div>Pin 1</div>
          <div>Lights</div>
          <div>3</div>
          <div>100 W</div>
          <DeleteIcon />
          <DeleteIcon />
        </div>
          </div>
      </div>
    </div>
  );
};
const userRole = "admin";
export default Premise;
Premise.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
