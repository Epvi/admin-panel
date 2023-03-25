import React from "react";
import { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import {
  doc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  setDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import { Dropdown, css } from "@nextui-org/react";

import { getData, useSmifiInformation } from "../auth/smifiReducer";
import Layout from "../components/Layout";
import { withProtected } from "../src/hooks/routes";

import styles from "../styles/SmifiEdit.module.css";

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

const EditSmifi = () => {
  const { smifiInfoState, smifiInfoStateDispatch } = useSmifiInformation();

  const [allDevices, setAllDevices] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [devicePin, setDevicePin] = useState(null);
  const [newRoom, setNewRoom] = useState(null);
  const [newDevice, setNewDevice] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeviceAddModal, setOpenDeviceAddModal] = useState(false);
  const [openDeviceDialog, setOpenDeviceDialog] = useState(false);
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [selectPin, setSelectPin] = useState(null);
  const [limitVal, setLimitVal] = useState(null);
  const [limitPinVal, setLimitPinVal] = useState(null);
  const [openLimitModal, setOpenLimitModal] = useState(false);
  const [wifiValue, setWifiValue] = useState(null);
  const [openWifiModal, setOpenWifiModal] = useState(false);

  useEffect(() => {
    async function getMarker() {
      let newArray = [];
      const querySnapshot = await getDocs(collection(database, "Smifis"));
      querySnapshot.forEach((doc) => {
        newArray.push(doc.data());
      });
      setAllDevices(newArray);
    }
    getMarker();
  }, [loadData]);

  useEffect(() => {
    if (deviceId != null) {
      const GetSmifi = async (e) => {
        // console.log(deviceId);
        if (deviceId != "") {
          await getData(smifiInfoStateDispatch, deviceId);
        } else {
          alert("Couldn't find device id!");
        }
      };
      GetSmifi();
    }
  }, [deviceId]);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (deviceId === null) {
      alert("Please select a device!");
      return;
    }
    let pinVal = deviceId !== null && parseInt(devicePin["anchorKey"]);
    const newRoomNum = parseInt(newRoom);
    if (pinVal !== null) {
      // update the doc
      const dofRef = doc(database, "Smifis", deviceId);
      const fieldName = `Pin ${pinVal}`;
      //   console.log(fieldName);
      //   let newArry = smifiInfoState.smifiInformation?.[fieldName];
      //   newArry.push(newRoomNum);
      const data = {
        [fieldName]: arrayUnion(newRoomNum),
      };
      await updateDoc(dofRef, data);
      setLoadData(!loadData);
    } else {
      alert("The Room must be a number!");
    }
    setOpenAddModal(false);
  };

  const handleAddDevice = async (e) => {
    e.preventDefault();
    if (newDevice != null && newDevice != "") {
      //set the new device
      await setDoc(doc(database, "Smifis", newDevice), {
        "Pin 1": [],
        "Pin 2": [],
        "Pin 3": [],
        "Pin 4": [],
        "Pin 5": [],
        "Pin 6": [],
        id: newDevice,
        limits: [0, 0, 0, 0, 0, 0],
        wifi: 0,
      });
      setLoadData(!loadData);
    } else {
      alert("Please enter the device name!");
    }
    setOpenDeviceAddModal(false);
  };

  const deleteDevice = async () => {
    if (deviceId !== null) {
      try {
        await deleteDoc(doc(database, "Smifis", deviceId));
        setLoadData(!loadData);
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      alert("No device Found!");
    }
  };

  const deleteRoom = async () => {
    // console.log(deviceId, selectPin, roomToDelete);
    if (deviceId !== null && selectPin !== null && roomToDelete !== null) {
      try {
        await updateDoc(doc(database, "Smifis", deviceId), {
          [selectPin]: arrayRemove(roomToDelete),
        });
        setLoadData(!loadData);
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      alert("No Room Found!");
    }
    setOpenRoomDialog(false);
  };

  const handleWifiChange = async (e) => {
    e.preventDefault();
    let newWifiValue = parseInt(wifiValue["anchorKey"]);
    try {
      await updateDoc(doc(database, "Smifis", deviceId), {
        wifi: newWifiValue,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
    // console.log("Pin selected for Wifi", newWifiValue);
    setOpenWifiModal(false);
  };

  const editLimit = async (e) => {
    e.preventDefault();
    let newlimitPinVal = parseInt(limitPinVal["anchorKey"]);
    if (limitVal !== null) {
      const newValue = parseFloat(limitVal);
      let newArray = smifiInfoState.smifiInformation?.limits;
      newArray[newlimitPinVal-1] = newValue;
      try {
        await updateDoc(doc(database, "Smifis", deviceId), {
          limits: newArray,
        });
        setLoadData(!loadData);
      } catch (error) {
        console.log("Error", error);
      }
    }
    setOpenLimitModal(false);
  };

  return (
    <Layout userRole={"admin"}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.heading}>Smi-fi List</div>
          <div className={styles.list_smifiInfo_container}>
            {/* ----------Right ----------------- */}
            <div className={styles.smifiList}>
              <div className={styles.addbtn}>
                Add new device
                <AddBoxIcon
                  sx={{
                    marginLeft: "10px",
                    padding: "3px",
                    cursor: "pointer",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenDeviceAddModal(true)}
                />
              </div>
              {allDevices.map((el, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.singleEl} ${
                      deviceId === el.id && styles.activate
                    }`}
                  >
                    <div
                      className={styles.decideIdField}
                      onClick={() => {
                        setDeviceId(el.id);
                      }}
                    >
                      Device Id: {el.id}
                    </div>
                    <div className={styles.addbtn}>
                      <DeleteIcon
                        onClick={() => {
                          setDeviceId(el.id);
                          setOpenDeviceDialog(true);
                        }}
                        sx={{
                          marginLeft: "10px",
                          padding: "3px",
                          cursor: "pointer",
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* ------------------ left ------------- */}
            <div className={styles.smifiInfo}>
              <div className={styles.addbtn}>
                Add new room
                <AddBoxIcon
                  sx={{
                    marginLeft: "10px",
                    padding: "3px",
                    cursor: "pointer",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenAddModal(true)}
                />
              </div>
              {smifiInfoState.smifiInformation && (
                <>
                  <div className={styles.singleDeviceInfo}>
                    {/* Pins and rooms */}
                    <div className={styles.pinStyles}>
                      <div>Pin 1 - Rooms: </div>
                      <div>
                        {smifiInfoState.smifiInformation["Pin 1"]?.map(
                          (room, index) => {
                            return (
                              <div className={styles.room_deleteContainer}>
                                <div key={index}>&nbsp;{room}</div>
                                <div className={styles.addbtn}>
                                  <DeleteIcon
                                    onClick={() => {
                                      setRoomToDelete(room);
                                      setSelectPin("Pin 1");
                                      setOpenRoomDialog(true);
                                    }}
                                    sx={{
                                      marginLeft: "10px",
                                      padding: "3px",
                                      cursor: "pointer",
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className={styles.pinStyles}>
                      <div>Pin 2 - Rooms: </div>
                      <div>
                        {smifiInfoState.smifiInformation["Pin 2"]?.map(
                          (room, index) => {
                            return (
                              <div className={styles.room_deleteContainer}>
                                <div key={index}>&nbsp;{room}</div>
                                <div className={styles.addbtn}>
                                  <DeleteIcon
                                    onClick={() => {
                                      setRoomToDelete(room);
                                      setSelectPin("Pin 2");
                                      setOpenRoomDialog(true);
                                    }}
                                    sx={{
                                      marginLeft: "10px",
                                      padding: "3px",
                                      cursor: "pointer",
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className={styles.pinStyles}>
                      <div>Pin 3 - Rooms: </div>
                      <div>
                        {smifiInfoState.smifiInformation["Pin 3"]?.map(
                          (room, index) => {
                            return (
                              <div className={styles.room_deleteContainer}>
                                <div key={index}>&nbsp;{room}</div>
                                <div className={styles.addbtn}>
                                  <DeleteIcon
                                    onClick={() => {
                                      setRoomToDelete(room);
                                      setSelectPin("Pin 3");
                                      setOpenRoomDialog(true);
                                    }}
                                    sx={{
                                      marginLeft: "10px",
                                      padding: "3px",
                                      cursor: "pointer",
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className={styles.pinStyles}>
                      <div>Pin 4 - Rooms: </div>
                      <div>
                        {smifiInfoState.smifiInformation["Pin 4"]?.map(
                          (room, index) => {
                            return (
                              <div className={styles.room_deleteContainer}>
                                <div key={index}>&nbsp;{room}</div>
                                <div className={styles.addbtn}>
                                  <DeleteIcon
                                    onClick={() => {
                                      setRoomToDelete(room);
                                      setSelectPin("Pin 4");
                                      setOpenRoomDialog(true);
                                    }}
                                    sx={{
                                      marginLeft: "10px",
                                      padding: "3px",
                                      cursor: "pointer",
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className={styles.pinStyles}>
                      <div>Pin 5 - Rooms: </div>
                      <div>
                        {smifiInfoState.smifiInformation["Pin 5"]?.map(
                          (room, index) => {
                            return (
                              <div className={styles.room_deleteContainer}>
                                <div key={index}>&nbsp;{room}</div>
                                <div className={styles.addbtn}>
                                  <DeleteIcon
                                    onClick={() => {
                                      setRoomToDelete(room);
                                      setSelectPin("Pin 5");
                                      setOpenRoomDialog(true);
                                    }}
                                    sx={{
                                      marginLeft: "10px",
                                      padding: "3px",
                                      cursor: "pointer",
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className={styles.pinStyles}>
                      <div>Pin 6 - Rooms: </div>
                      <div>
                        {smifiInfoState.smifiInformation["Pin 6"]?.map(
                          (room, index) => {
                            return (
                              <div className={styles.room_deleteContainer}>
                                <div key={index}>&nbsp;{room}</div>
                                <div className={styles.addbtn}>
                                  <DeleteIcon
                                    onClick={() => {
                                      setRoomToDelete(room);
                                      setSelectPin("Pin 6");
                                      setOpenRoomDialog(true);
                                    }}
                                    sx={{
                                      marginLeft: "10px",
                                      padding: "3px",
                                      cursor: "pointer",
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    {/* other details*/}
                    <div className={styles.wifiInfo}>
                      {/* {smifiInfoState.smifiInformation?.wifi && ( */}
                      <div>
                        <div>Wifi: </div>
                        <div>{smifiInfoState.smifiInformation?.wifi}</div>
                        <div className={styles.addbtn}>
                          <EditIcon
                            onClick={() => setOpenWifiModal(true)}
                            sx={{
                              marginLeft: "10px",
                              padding: "3px",
                              cursor: "pointer",
                              color: "white",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </div>
                      {/* )} */}
                    </div>
                  </div>
                  <div className={styles.limits}>
                    {smifiInfoState.smifiInformation?.limits === 0 ? (
                      "No Limit data found!"
                    ) : (
                      <div>
                        <div className={styles.limitHeading}>Limits</div>
                        {smifiInfoState.smifiInformation.limits?.map(
                          (limit, index) => {
                            return (
                              <div className={styles.singleLimit} key={index}>
                                <div className={styles.index_limitBlock}>
                                  <div>{index} : </div>
                                  <div className={styles.limitBlock}>
                                    {limit}
                                  </div>
                                </div>
                                <div className={styles.addbtn}>
                                  <EditIcon
                                    onClick={() => setOpenLimitModal(true)}
                                    sx={{
                                      marginLeft: "10px",
                                      padding: "3px",
                                      cursor: "pointer",
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* -----------Modals ----------------- */}
        {/* Add new room */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          closeAfterTransition
        >
          <Fade in={openAddModal}>
            <Box sx={style}>
              <form onSubmit={handleAddRoom}>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color="light"
                    css={{
                      fontSize: "$lg",
                      marginTop: "$8",
                      marginBottom: "$8",
                    }}
                  >
                    Pin : {devicePin}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="primary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={devicePin}
                    onSelectionChange={setDevicePin}
                    width="$12"
                    css={{
                      fontSize: "$lg",
                    }}
                  >
                    <Dropdown.Item key="Pin">Pin</Dropdown.Item>
                    <Dropdown.Item key="1" withDivider>
                      1
                    </Dropdown.Item>
                    <Dropdown.Item key="2">2</Dropdown.Item>
                    <Dropdown.Item key="3">3</Dropdown.Item>
                    <Dropdown.Item key="4">4</Dropdown.Item>
                    <Dropdown.Item key="5">5</Dropdown.Item>
                    <Dropdown.Item key="6">6</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  id="newRoom"
                  placeholder="Add room number..."
                  onChange={(e) => setNewRoom(e.target.value)}
                  style={{
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
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
        {/* add new device */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openDeviceAddModal}
          onClose={() => setOpenDeviceAddModal(false)}
          closeAfterTransition
        >
          <Fade in={openDeviceAddModal}>
            <Box sx={style}>
              <form onSubmit={handleAddDevice}>
                <input
                  id="newDevice"
                  placeholder="Enter device Id..."
                  onChange={(e) => setNewDevice(e.target.value)}
                  style={{
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
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
        {/* edit Limits */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openLimitModal}
          onClose={() => setOpenLimitModal(false)}
          closeAfterTransition
        >
          <Fade in={openLimitModal}>
            <Box sx={style}>
              <form onSubmit={editLimit}>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color="light"
                    css={{
                      fontSize: "$lg",
                      marginTop: "$8",
                      marginBottom: "$8",
                    }}
                  >
                    Select Wifi Pin : {limitPinVal}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="primary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={limitPinVal}
                    onSelectionChange={setLimitPinVal}
                    width="$12"
                    css={{
                      fontSize: "$lg",
                    }}
                  >
                    <Dropdown.Item key="Pin">Pin</Dropdown.Item>
                    <Dropdown.Item key="1" withDivider>
                      1
                    </Dropdown.Item>
                    <Dropdown.Item key="2">2</Dropdown.Item>
                    <Dropdown.Item key="3">3</Dropdown.Item>
                    <Dropdown.Item key="4">4</Dropdown.Item>
                    <Dropdown.Item key="5">5</Dropdown.Item>
                    <Dropdown.Item key="6">6</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  id="updateLimit"
                  type="number"
                  step="any"
                  placeholder="Add new limit..."
                  onChange={(e) => setLimitVal(e.target.value)}
                  style={{
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
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
        {/* Wifi Modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openWifiModal}
          onClose={() => setOpenAddModal(false)}
          closeAfterTransition
        >
          <Fade in={openWifiModal}>
            <Box sx={style}>
              <form onSubmit={handleWifiChange}>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color="light"
                    css={{
                      fontSize: "$lg",
                      marginTop: "$8",
                      marginBottom: "$8",
                    }}
                  >
                    Select Wifi Pin : {wifiValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="primary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={wifiValue}
                    onSelectionChange={setWifiValue}
                    width="$12"
                    css={{
                      fontSize: "$lg",
                    }}
                  >
                    <Dropdown.Item key="Pin">Pin</Dropdown.Item>
                    <Dropdown.Item key="1" withDivider>
                      1
                    </Dropdown.Item>
                    <Dropdown.Item key="2">2</Dropdown.Item>
                    <Dropdown.Item key="3">3</Dropdown.Item>
                    <Dropdown.Item key="4">4</Dropdown.Item>
                    <Dropdown.Item key="5">5</Dropdown.Item>
                    <Dropdown.Item key="6">6</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
        {/* ---------------- Dialogs --------------*/}
        {/* Renove Device */}
        <Dialog
          open={openDeviceDialog}
          onClose={() => setOpenDeviceDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this device?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                deleteDevice();
                setOpenDeviceDialog(false);
              }}
              autoFocus
            >
              Agree
            </Button>
            <Button onClick={() => setOpenDeviceDialog(false)}>Disagree</Button>
          </DialogActions>
        </Dialog>
        {/* Remove room */}
        <Dialog
          open={openRoomDialog}
          onClose={() => setOpenDeviceDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this room?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                deleteRoom();
                setOpenRoomDialog(false);
              }}
              autoFocus
            >
              Agree
            </Button>
            <Button onClick={() => setOpenRoomDialog(false)}>Disagree</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
};

export default withProtected(EditSmifi);
