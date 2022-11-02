import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Layout from "../../components/Layout";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getUserData, usePremiseUser } from "../../auth/premiseUserReducer";
import { getLogsData, useTrackingLogs } from "../../auth/trackingLogsReducer";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const styling = {
  backgroundColor: "#556cd6",
  color: "white",
};

const Tracking = () => {
  const [phoneNo, setPhoneNo] = useState(true);
  const { premiseUserState, premiseUserDispatch } = usePremiseUser();
  const { trackingLogsState, trackingLogsDispatch } = useTrackingLogs();
  // const [graph, setGraph] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [smifiState, setSmifiState] = useState();
  const [deviceStatus, setDeviceStatus] = useState([]);
  const [unit, setUnit] = useState("Power");
  const [time, setTime] = useState("Today");
  const { asPath, pathname } = useRouter();
  const bgStyle = {
    backgroundColor: "#556cd6",
    color: "white",
  };
  const handleClick = (index) => {
    if (index == 1) Router.push("/customerdata/information");
    if (index == 2) Router.push("/customerdata/premise");
    if (index == 3) Router.push("/customerdata/tracking");
    if (index == 4) Router.push("/customerdata/automation");
    if (index == 5) Router.push("/customerdata/raiseticket");
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  let premiseUserData = [];
  let trackingLogsData = [];
  let arr = [];
  let currSmifi;
  
   let data = [],
     current,
     power,
     timeStamp,
     limit = 0;
  const search = async (e) => {
    e.preventDefault();
    console.log(phoneNo);
    if (phoneNo.length == 10) {
      getUserData(premiseUserDispatch, premiseUserData, phoneNo);
      // setGraph(true);
    } else {
      alert("Enter Valid Phone No");
    }
  };
  useEffect(() => {
    if (premiseUserState.premiseUserData) {
      currSmifi = premiseUserState.premiseUserData.smifis[0],
      setSmifiState(currSmifi)
      getLogsData(
        trackingLogsDispatch,
        trackingLogsData,
        currSmifi,
        1
      );
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
  }, [premiseUserState.premiseUserData]);
  if (trackingLogsState.trackingLogsData) {
    limit = 0;
    if (unit == "Power") {
      trackingLogsState.trackingLogsData.map((val) => {
        current =
          val.curr1 + val.curr2 + val.curr3 + val.curr4 + val.curr5 + val.curr6;
        current = current.toFixed(2);
        current = parseFloat(current);
        power = current * val.volt;
        power = power.toFixed(2);
        power = parseFloat(power);
        limit = limit < power ? power : limit;
        timeStamp = new Date(
            val.timestamp * 10000
        ).toString().slice(3, 25)
        data.push({ name: timeStamp, value: power });
      });
    }
    if (unit == "Current") {
      trackingLogsState.trackingLogsData.map((val) => {
        current =
          val.curr1 + val.curr2 + val.curr3 + val.curr4 + val.curr5 + val.curr6;
        current = current.toFixed(2);
        current = parseFloat(current);
        power = current * val.volt;
        power = power.toFixed(2);
        power = parseFloat(power);
        if (limit <= current) {
          limit = current;
        }
        timeStamp = new Date(
          val.timestamp * 10000
      ).toString().slice(3, 25)
        data.push({ name: timeStamp, value: current });
      });
    }
    if (unit == "Voltage") {
      trackingLogsState.trackingLogsData.map((val) => {
        current =
          val.curr1 + val.curr2 + val.curr3 + val.curr4 + val.curr5 + val.curr6;
        current = current.toFixed(2);
        current = parseFloat(current);

        power = current * val.volt;
        power = power.toFixed(2);
        power = parseFloat(power);

        if (limit <= val.volt) {
          limit = val.volt;
        }
        timeStamp = new Date(
          val.timestamp * 10000
      ).toString().slice(3, 25)
        data.push({ name: timeStamp, value: val.volt });
      });
    }
  }
  const timeClick = (timeCount) => {
    console.log(smifiState)
    getLogsData(
      trackingLogsDispatch,
      trackingLogsData,
      smifiState,
      timeCount
    );
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  };
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
  if(trackingLogsState.trackingLogsData)
  console.log(trackingLogsState.trackingLogsData.length)
  const changeSmifiGraph = (smifi) => {
    currSmifi = smifi;
    setSmifiState(currSmifi)
    setLoading(false);

    getLogsData(
      trackingLogsDispatch,
      trackingLogsData,
      currSmifi,
      1
    );
    setTime("Today")
    setTimeout(()=>{
     setLoading(true);
    },1500)
  }
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

      {premiseUserState.premiseUserData &&
      trackingLogsState.trackingLogsData ? (
        loading ? (
          <>
            <div
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
                  onClick={()=>{
                    changeSmifiGraph(val)
                  }}
                    key={val}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: smifiState==val?"#D9D9D9":"#f7f5f5",
                      display: "flex",
                      alignItems: "center",
                      padding: "15px",
                      cursor:"pointer"
                    }}
                  >
                    {val} &nbsp;{" "}
                    {deviceStatus[c]==true ? (
                    console.log(deviceStatus[c],c),
                      <span style={{ color: "#45ff4b" }}>● &nbsp; Live</span>
                    ) : (
                      <span style={{ color: "red" }}>● &nbsp; Not Live</span>
                    )}
                  </div>
                ))}
                <RefreshIcon
                  onClick={refreshDevice}
                  sx={{ fontSize: "40px", cursor: "pointer" }}
                />
              </div>
            </div>
            <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                    marginRight: "80px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginLeft: "40vw" }}>
                    Last updated on{" "}
                    {trackingLogsState.trackingLogsData[trackingLogsState.trackingLogsData.length - 1]
                      ? new Date(
                        trackingLogsState.trackingLogsData[trackingLogsState.trackingLogsData.length - 1].timestamp * 10000
                      )
                        .toString()
                        .slice(0, 25)
                      : null}
                  </div>
                  <div style={{ display: "flex" }}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={unit}
                          // label="Age"
                          onChange={handleUnitChange}
                        >
                          <MenuItem value="Power">Power</MenuItem>
                          <MenuItem value="Current">Current</MenuItem>
                          <MenuItem value="Voltage">Voltage</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, marginLeft: "20px" }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={time}
                          // label="Age"
                          onChange={handleTimeChange}
                        >
                          <MenuItem
                            value="Today"
                            onClick={() => {
                              timeClick(1);
                            } }
                          >
                            Today
                          </MenuItem>
                          <MenuItem
                            value="Monthly"
                            onClick={() => {
                              timeClick(2);
                            } }
                          >
                            Weekly
                          </MenuItem>
                          <MenuItem
                            value="Weekly"
                            onClick={() => {
                              timeClick(3);
                            } }
                          >
                            Monthly
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div><div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                    <div>
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {current}
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                        Live Current
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          marginTop: "40px",
                        }}
                      >
                        {trackingLogsState.trackingLogsData[trackingLogsState.trackingLogsData.length - 1] ? (
                          trackingLogsState.trackingLogsData[trackingLogsState.trackingLogsData.length - 1].volt
                        ) : (
                          <p>Nil</p>
                        )}
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                        Live Voltage
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          marginTop: "40px",
                        }}
                      >
                        {power}
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                        Live Power/Load
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          transform: `translateY(150px)`,
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginLeft: "-50px",
                        }}
                      >
                        {unit}
                      </div>
                      <LineChart
                        width={1100}
                        height={500}
                        data={data}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                      >
                        <Line
                          dot={false}
                          type="monotone"
                          dataKey="value"
                          stroke="#8884d8" />
                        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
                        <XAxis minTickGap={50} dataKey="name" />
                        <YAxis datakey="value" domain={[0, limit]} />
                        <Tooltip />
                      </LineChart>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginLeft: "500px",
                        }}
                      >
                        Time
                      </div>
                    </div>
                  </div></>
        ) : (
          <CircularProgress sx={{ margin: "45vw", marginTop: "20px" }} />
        )
      ) : null}
    </div>
  );
};
const userRole = "admin";
export default Tracking;
Tracking.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
