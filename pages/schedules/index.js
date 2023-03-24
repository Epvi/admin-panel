import React from "react";
import { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Dropdown, css } from "@nextui-org/react";

import { getData, useUserInformation } from "../../auth/informationReducer";
import { getSchedulesData, useSchedules } from "../../auth/scheduleReducer";
import Layout from "../../components/Layout";
import { withProtected } from "../../src/hooks/routes";

import styles from "../../styles/ScheduleStyles.module.css";

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

const EditSchedule = () => {
  const { userInformationState, userInformationDispatch } =
    useUserInformation();
  const userInformation = {};
  const { schedulesState, schedulesDispatch } = useSchedules();
  let schedulesData = [];

  const [foundUser, setFoundUser] = useState(true);
  const [phoneNo, setPhoneNo] = useState(true);

  let uid = userInformationState.userInformation
    ? userInformationState.userInformation.uid
    : null;

  const GetUserInfo = async (e) => {
    e.preventDefault();
    console.log(phoneNo);
    if (phoneNo.length == 10) {
      await getData(userInformationDispatch, userInformation, phoneNo);
    } else {
      alert("Enter Valid Phone No");
    }
  };

  useEffect(() => {
    if (JSON.stringify(userInformationState.userInformation) == "{}") {
      setFoundUser(false);
    } else {
      setFoundUser(true);
      if (userInformationState.userInformation) {
        const func = async () => {
          await getSchedulesData(schedulesDispatch, schedulesData, uid);
        };
        func();
      }
    }
  }, [userInformationState.userInformation]);

  // console.log(userInformationState.userInformation);
  // console.log("From EditSchedule", schedulesState.schedulesData);

  return (
    <Layout userRole={"admin"}>
      <div
        style={{
          marginRight: "15px",
          marginTop: "15px",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ marginLeft: "20px", color: "#556CD6" }}>
            Welcome &nbsp;&nbsp;
            {userInformationState.userInformation
              ? userInformationState.userInformation.name
              : null}
          </h2>
          <h3 style={{ marginLeft: "10vw" }}>Enter Customer Phone Number : </h3>
          <form onSubmit={GetUserInfo}>
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
              error={!foundUser ? true : false}
              helperText={!foundUser ? "No User Found" : ""}
              required
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <Button
              sx={{ marginLeft: "5px", padding: "13px", width: "7vw" }}
              variant="contained"
              type="submit"
              onClick={GetUserInfo}
            >
              Search
            </Button>
          </form>
        </div>
        {/* Schedule content */}
        <div className={styles.main}>
          <div>
            {schedulesState.schedulesData?.length > 0 ? (
              <ScheduleList />
            ) : (
              <div> No Schedule available</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

function ScheduleList() {
  const { userInformationState, userInformationDispatch } =
    useUserInformation();
  const userInformation = {};
  const { schedulesState, schedulesDispatch } = useSchedules();
  let schedulesData = [];

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [devicePin, setDevicePin] = useState("Pin");
  const [deviceId, setDeviceId] = useState("Smi-fi");
  const [deviceState, setDeviceState] = useState("On");
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [pinToEdit, setPinToEdit] = useState();

  const uid = userInformationState.userInformation?.uid;

  const handleAddPin = (e) => {
    e.preventDefault();
    let smifiVal = deviceId["anchorKey"];
    let pinVal = parseInt(devicePin["anchorKey"]);
    let deviceStatus = deviceState["anchorKey"];
    const deState = deviceStatus == "on" ? true : false;

    const nSchedules = userInformationState.userInformation?.nSchedules;
    const backId = nSchedules + 1;
    const docName = `${uid}_${backId}`;
    const pinArray = [];
    const pinData = `${smifiVal}_${pinVal}_${deState}`;
    pinArray.push(pinData);

    if (startTime !== "" && stopTime !== "") {
      const func = async () => {
        try {
          await setDoc(doc(database, "Schedules", docName), {
            id: backId,
            name: "",
            pins: pinArray,
            start: startTime,
            stop: stopTime,
            uid: uid,
          });
        } catch (error) {
          console.log("Error", error);
        }
      };
      func();
      // close the modal after use
      setOpenAddModal(false);

      const func2 = async () => {
        // need to update the backId as well in user array
        await updateDoc(doc(database, "Users", uid), {
          nSchedules: backId,
        });
        await getSchedulesData(schedulesDispatch, schedulesData, uid);
      };
      func2();
    } else {
      alert("Please enter valid data!");
    }
    setOpenAddModal(false);
  };

  const handleEditPin = async (e) => {
    e.preventDefault();
    const docName = `${uid}_${pinToEdit}`;
    try {
      await updateDoc(doc(database, "Schedules", docName), {
        start: startTime,
        stop: stopTime,
      });
      setOpenEditModal(false);
    } catch (error) {
      console.log("Error", error);
    }
    await getSchedulesData(schedulesDispatch, schedulesData, uid);
    setOpenEditModal(false);
  };

  // useEffect(() => {}, [schedulesState.schedulesData]);

  const handleDeleteClick = async (id) => {
    const del = `${uid}_${id}`;
    try {
      await deleteDoc(doc(database, "Schedules", del));
      await getSchedulesData(schedulesDispatch, schedulesData, uid);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className={styles.ListContainer}>
      {schedulesState.schedulesData?.map((el) => {
        return (
          <div key={el.id} className={styles.singleEl}>
            <div>{el.id}</div>
            {/* <div>{el.pins[0]}</div> */}
            {el.pins.length !== 0 ? (
              <div>
                {el.pins.map((i, index) => (
                  <div key={index}>{i}</div>
                ))}
              </div>
            ) : (
              "Data Unavailable!"
            )}

            <div>
              start: {el.start} stop: {el.stop}
            </div>
            <EditIcon
              onClick={() => {
                setPinToEdit(el.id);
                setOpenEditModal(true);
              }}
              sx={{
                marginLeft: "6px",
                padding: "3px",
                cursor: "pointer",
                backgroundColor: "black",
                color: "white",
                cursor: "pointer",
              }}
            />
            <DeleteIcon
              onClick={() => {
                handleDeleteClick(el.id);
              }}
              sx={{
                marginLeft: "6px",
                padding: "3px",
                cursor: "pointer",
                backgroundColor: "black",
                color: "white",
                cursor: "pointer",
              }}
            />
          </div>
        );
      })}
      <div>
        Add new Schedule
        <AddBoxIcon
          onClick={() => setOpenAddModal(true)}
          sx={{
            marginLeft: "6px",
            padding: "3px",
            cursor: "pointer",
            backgroundColor: "black",
            color: "white",
            cursor: "pointer",
          }}
        />
      </div>
      {/* Modal Edit */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEditModal}>
          <Box sx={style}>
            <form onSubmit={handleEditPin}>
              <input
                id="startTime"
                placeholder="Start time..."
                onChange={(e) => setStartTime(e.target.value)}
                style={{
                  // marginLeft: "1vw",
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <input
                id="stopTime"
                placeholder="Stop time..."
                onChange={(e) => setStopTime(e.target.value)}
                style={{
                  // marginLeft: "1vw",
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <Button
                variant="contained"
                style={{ marginTop: "10px", width: "100%" }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* Modal {ADD} */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAddModal}>
          <Box sx={style}>
            <form onSubmit={handleAddPin}>
              {/* Smi-fi selector */}
              <Dropdown>
                <Dropdown.Button
                  flat
                  color="light"
                  css={{
                    fontSize: "$lg",
                    marginTop: "$11",
                  }}
                >
                  {deviceId}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={deviceId}
                  onSelectionChange={setDeviceId}
                  css={{
                    fontSize: "$lg",
                  }}
                >
                  <Dropdown.Item key="Smi-Fi">Smi-Fi</Dropdown.Item>
                  {userInformationState.userInformation?.smifis?.map((val) => (
                    <Dropdown.Item key={val}>{val}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {/* Device pin selector */}
              <Dropdown>
                <Dropdown.Button
                  flat
                  color="light"
                  css={{
                    fontSize: "$lg",
                    marginTop: "$10",
                  }}
                >
                  {devicePin}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={devicePin}
                  onSelectionChange={setDevicePin}
                  css={{
                    fontSize: "$lg",
                  }}
                >
                  <Dropdown.Item key="Pin">Pin</Dropdown.Item>
                  <Dropdown.Item key="1">1</Dropdown.Item>
                  <Dropdown.Item key="2">2</Dropdown.Item>
                  <Dropdown.Item key="3">3</Dropdown.Item>
                  <Dropdown.Item key="4">4</Dropdown.Item>
                  <Dropdown.Item key="5">5</Dropdown.Item>
                  <Dropdown.Item key="6">6</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* Device status */}
              <Dropdown>
                <Dropdown.Button
                  flat
                  color="light"
                  css={{
                    fontSize: "$lg",
                    marginTop: "$11",
                  }}
                >
                  {deviceState}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={deviceState}
                  onSelectionChange={setDeviceState}
                  css={{
                    fontSize: "$lg",
                  }}
                >
                  <Dropdown.Item key="deviceStatus">
                    Device Status
                  </Dropdown.Item>
                  <Dropdown.Item key="on">On</Dropdown.Item>
                  <Dropdown.Item key="off">Off</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <input
                id="startTime"
                placeholder="Start time..."
                onChange={(e) => setStartTime(e.target.value)}
                style={{
                  // marginLeft: "1vw",
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <input
                id="stopTime"
                placeholder="Stop time..."
                onChange={(e) => setStopTime(e.target.value)}
                style={{
                  // marginLeft: "1vw",
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <Button
                variant="contained"
                style={{ marginTop: "10px", width: "100%" }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default withProtected(EditSchedule);
