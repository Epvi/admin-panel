import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Layout from "../../components/Layout";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from 'axios'
import { getUserData, usePremiseUser } from "../../auth/premiseUserReducer";
import { getRoomsData, usePremiseRooms } from "../../auth/premiseRoomsReducer";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SwitchMUI from "../../components/SwitchMUI";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Automation = () => {
  const { premiseUserState, premiseUserDispatch } = usePremiseUser();
  const { premiseRoomsState, premiseRoomsDispatch } = usePremiseRooms();
  const [phoneNo, setPhoneNo] = useState(true);
  const [domainName, setDomainName] = useState("");
  const [deviceStatus, setDeviceStatus] = useState([]);
  const [roomNo, setRoomNo] = useState(0);
  const { asPath, pathname } = useRouter();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);


  const styling = {
    backgroundColor: "#556cd6",
    color: "white",
  };

  let premiseUserData = [];
  let premiseRoomsData = [];
  let pinNo,applianceName;
  let arr = [];

  const handleClick = (index) => {
    if (index == 1) Router.push("/customerdata/information");
    if (index == 2) Router.push("/customerdata/premise");
    if (index == 3) Router.push("/customerdata/tracking");
    if (index == 4) Router.push("/customerdata/automation");
    if (index == 5) Router.push("/customerdata/raiseticket");
  };

  const search = async (e) => {
    e.preventDefault();
    if (phoneNo.length == 10) {
      phoneNo = "+91" + phoneNo;
      console.log(phoneNo);
      getUserData(premiseUserDispatch, premiseUserData, phoneNo);
      getRoomsData(premiseRoomsDispatch, premiseRoomsData, phoneNo);
    } else {
      alert("Enter Valid Phone No");
    }
  };
  let uid = premiseUserState.premiseUserData
    ? premiseUserState.premiseUserData.uid
    : null;
  let nRooms = premiseUserState.premiseUserData
    ? premiseUserState.premiseUserData.nRooms
    : null;

  useEffect(() => {
    if (premiseRoomsState.premiseRoomsData) {
      setDomainName(premiseRoomsState.premiseRoomsData[0].name);
      setTimeout(() => {
        setLoading(true);
      }, premiseUserState.premiseUserData.smifis.length * 3500);
      premiseUserState.premiseUserData.smifis.map(async (val) => {
        const options = {
          method: "GET",
          url: "https://adminpanelbackendepvi.herokuapp.com/trackingcheck",
          headers: { devices: val },
        };

        await axios
          .request(options)
          .then(function (response) {
            arr.push(response.data);
            if (!response.data) {
              setCount(count + 1);
            }
            setDeviceStatus(arr);
          })
          .catch(function (error) {
            console.error(error);
          });
      });
    
    }
  }, [premiseRoomsState.premiseRoomsData]);
  
  const refreshDevice = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, premiseUserState.premiseUserData.smifis.length * 3500);
    premiseUserState.premiseUserData.smifis.map(async (val) => {
      const options = {
        method: "GET",
        url: "https://adminpanelbackendepvi.herokuapp.com/trackingcheck",
        headers: { devices: val },
      };

      await axios
        .request(options)
        .then(function (response) {
          arr.push(response.data);
          if (!response.data) {
            setCount(count + 1);
          }
          setDeviceStatus(arr);
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  };
  return (
    <div
      style={{
        marginRight: "15px",
        marginTop: "10px",
        width: "100%",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ marginLeft: "20px", color: "#556CD6" }}>
          Welcome &nbsp;&nbsp;{" "}
          {premiseUserState.premiseUserData
            ? premiseUserState.premiseUserData.name
            : null}
        </h2>
        <h3 style={{ marginLeft: "10vw" }}>Enter Customer Phone Number : </h3>

        <TextField
          style={{
            width: "20vw",
            marginLeft: "10px",
          }}
          type="number"
          id="outlined"
          variant="outlined"
          name="outlined"
          label="Phone"
          required
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <Button
          sx={{ marginLeft: "5px", padding: "13px", width: "7vw" }}
          variant="contained"
          type="submit"
          onClick={search}
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
          fontWeight: "bold",
          letterSpacing: "0.5px",
          fontSize: "17px",
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
          style={pathname === "/customerdata/automation" ? styling : null}
        >
          Automation
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
      {premiseRoomsState.premiseRoomsData ? (
                loading ? (
        <><div
          style={{
            marginLeft: "12px",
            marginRight: "12px",
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontWeight: "bolder" }}>
              {premiseUserState.premiseUserData.smifis.length} Smi-Fi
              Installed
            </h2>
            <p>{count} Smi-Fi not live</p>
          </div>
          <div
            style={{
              display: "flex",
              fontWeight: "bolder",
              fontSize: "22px",
              letterSpacing: "1px",
              alignItems: "center",
            }}
          >
            {premiseUserState.premiseUserData.smifis.map((val, c) => (
              <div
                
                key={val}
                style={{
                  marginLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  backgroundColor:"#D9D9D9"

                }}
              >
                {val} &nbsp;{" "}
                {deviceStatus[c] == true ? (
                  console.log(deviceStatus[c], c),
                  <span style={{ color: "#45ff4b" }}>● &nbsp; Live</span>
                ) : (
                  <span style={{ color: "red" }}>● &nbsp; Not Live</span>
                )}
              </div>
            ))}
            <RefreshIcon
              onClick={refreshDevice}
              sx={{ fontSize: "40px", cursor: "pointer" }} />
          </div>
          <div
            style={{
              marginLeft: "10px",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
              backgroundColor:"#D9D9D9",
              fontSize:"16px",
              fontWeight:"bold",
            }}
          > 
          <div style={{display:"flex"}}>

            <PowerSettingsNewIcon sx={{fontSize:"40px",marginRight:"50px"}}/>
            <div style={{marginRight:"40px"}}>Reset</div>
          </div>
             <div style={{marginLeft:"60px",marginTop:"-20px",fontWeight:"normal"}}>Turn on all Pin</div>
            </div>
        </div>
        <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "35px",
                fontWeight: "bold",
                fontSize: "17px"
              }}
            >
              <div style={{ marginLeft: "2vw" }}>
                Smi-fi <br />
                Information
              </div>
              <div style={{ marginLeft: "2vw" }}>
                Domain List
              </div>

              <div style={{ marginLeft: "10vw" }}>
                Domain Information - {domainName}
              </div>
              <div style={{ marginLeft: "8vw" }}>
                Status/Control
              </div>
              <div style={{ marginRight: "1vw" }}>
                Schedule
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
                {premiseUserState.premiseUserData?.smifis.map((smifi, count) => (
                  <div
                    key={count}
                    style={{
                      marginTop: "20px",
                      marginLeft: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {count + 1}{" "}
                    <input
                      type="text"
                      id={`smifi_${count}`}
                      value={smifi}
                      // onChange={handleChange}
                      readOnly
                      style={{
                        marginLeft: "1vw",
                        width: "9vw",
                        border: "none",
                        padding: "15px",
                        paddingLeft: "20px",
                        cursor: "pointer",
                        // paddingRight: "-10px",
                        backgroundColor: "#D9D9D9",
                      }} />
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-around",
                  alignItems: "center",
                  marginLeft: "2vw",
                }}
              >
                {premiseRoomsState.premiseRoomsData?.map((roomName, count) => (
                  <div
                    key={count}
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {count + 1}{" "}
                    <input
                      onClick={() => {
                        setRoomNo(count);
                        setDomainName(roomName.name);
                      } }
                      type="text"
                      value={`${roomName.name}`}
                      readOnly
                      style={{
                        marginLeft: "1vw",
                        cursor: "pointer",
                        width: "13vw",
                        border: "none",
                        padding: "15px",
                        paddingLeft: "20px",
                        backgroundColor: "#D9D9D9",
                      }} />
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent:"space-between",
                  marginLeft: "2vw",
                  // marginRight:"20px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "15px",
                    padding: "15px",
                    marginLeft: "10px",
                    // marginRight:"100px",
                    width: "41.5vw",
                  }}
                >
                  <div>Smifi</div>
                  <div>Pin</div>
                  <div>Appliance</div>
                  <div>Qty </div>
                  <div style={{ marginRight: "10px" }}>Power</div>
                </div>
                {premiseRoomsState.premiseRoomsData
                  ? premiseUserState.premiseUserData?.smifis.map(
                    (device, counter) => (
                      (pinNo = premiseRoomsState.premiseRoomsData[roomNo]
                        ? premiseRoomsState.premiseRoomsData[roomNo][device]
                        : null),
                      pinNo
                        ? pinNo.map((pin) => pin
                          ? ((applianceName =
                            premiseRoomsState.premiseRoomsData[roomNo][`${device}_${pin}`]),
                            applianceName
                              ? applianceName.map((applName, coun) => applName ? (
                                <div
                                  key={Math.random()}
                                  style={{ display: "flex" }}
                                >
                                  <div
                                    key={Math.random()}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      fontSize: "17px",
                                      background: "#D9D9D9",
                                      padding: "15px",
                                      marginBottom: "20px",
                                      width: "41.5vw",
                                    }}
                                  >
                                    <div>{device}</div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginLeft: "-30px"
                                      }}
                                    >
                                      Pin {pin}
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {applName.split("-")[0].trim()}
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {applName.split("-")[1].trim()}
                                    </div>

                                    <div>100 W</div>
                                  </div>
                                  <SwitchMUI deviceId={device} devicePin={pin}/>
                                </div>
                              ) : null
                              )
                              : null)
                          : null
                        )
                        : null
                    )
                  )
                  : null}
              </div>
            </div>
          </div></>
                ):<CircularProgress sx={{ margin: "45vw", marginTop: "20px" }} />
      ) : null}
    </div>
  );
};
const userRole = "admin";
export default Automation;
Automation.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
