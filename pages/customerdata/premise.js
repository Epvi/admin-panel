import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Layout from "../../components/Layout";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { getUserData, usePremiseUser } from "../../auth/premiseUserReducer";
import { getRoomsData, usePremiseRooms } from "../../auth/premiseRoomsReducer";
import { Dropdown, css } from "@nextui-org/react";
import { database } from "../../firebaseConfig";
import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
  getDoc
} from "firebase/firestore";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DeleteIcon from "@mui/icons-material/Delete";

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

const Premise = () => {
  const { premiseUserState, premiseUserDispatch } = usePremiseUser();
  const { premiseRoomsState, premiseRoomsDispatch } = usePremiseRooms();
  const [phoneNo, setPhoneNo] = useState(true);
  const [smifiFlag, setSmifiFlag] = useState(false);
  const [newSmifi, setNewSmifi] = useState("");
  const [roomFlag, setRoomFlag] = useState(false);
  const [newRoom, setNewRoom] = useState("");
  const [oldRoom, setOldRoom] = useState("");
  const [roomCount, setRoomCount] = useState();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [roomNo, setRoomNo] = useState(0);
  const { asPath, pathname } = useRouter();
  const [selectedSmifi, setSelectedSmifi] = useState("Smi-Fi");
  const [selectedPin, setSelectedPin] = useState("Pin");
  const [appId, setAppId] = useState("");
  const [appNo, setAppNo] = useState();
  const [changeRoomFlag, setChangeRoomFlag] = useState(0);
  const [oldSmifi, setOldSmifi] = useState();
  const [oldPin, setOldPin] = useState();
  const [oldAppName, setOldAppName] = useState();
  const styling = {
    backgroundColor: "#556cd6",
    color: "white",
  };
  let premiseUserData = [];
  let premiseRoomsData = [];
  const handleClick = (index) => {
    if (index == 1) Router.push("/customerdata/information");
    if (index == 2) Router.push("/customerdata/premise");
    if (index == 3) Router.push("/customerdata/tracking");
    if (index == 4) Router.push("/customerdata/service");
    if (index == 5) Router.push("/customerdata/raiseticket");
  };
  const handleDialogOpen = (c) => {
    setRoomCount(c)
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const search = async (e) => {
    e.preventDefault();
    console.log(phoneNo)
    if(phoneNo.length==10){
      
    getUserData(premiseUserDispatch, premiseUserData, phoneNo);
    getRoomsData(premiseRoomsDispatch, premiseRoomsData, phoneNo);
    }else{
      alert("Enter Valid Phone No")
    }
  };
  let uid = premiseUserState.premiseUserData
    ? premiseUserState.premiseUserData.uid
    : null;
  let nRooms = premiseUserState.premiseUserData
    ? premiseUserState.premiseUserData.nRooms
    : null;
  

  const handleSmifiChange = () => {
    setNewSmifi(document.getElementById("smifiId").value);
  };
  const handleNewSmifi = () => {
    setSmifiFlag(true);
  };
  const handleSmifiSubmit = async () => {
    const ref = doc(database, "Users", uid);
    if (newSmifi != "") {
      await updateDoc(ref, {
        smifis: arrayUnion(newSmifi),
      });
    }
    setSmifiFlag(false);
  };
  const deleteSmifi = async (count) => {
    const ref = doc(database, "Users", uid);
    let deletedSmifi = document.getElementById(`smifi_${count}`).value;

    await updateDoc(ref, {
      smifis: arrayRemove(deletedSmifi),
    });
    setSmifiFlag(false);
  };
  const handleRoomChange = () => {
    setNewRoom(document.getElementById("roomId").value);
  };
  const handleNewRoom = () => {
    setRoomFlag(true);
  };
  const handleRoomSubmit = async () => {
    if (newRoom != "") {
      await setDoc(doc(database, "Rooms", uid + "_" + (nRooms + 1)), {
        name: newRoom,
        uid: uid,
        // smifi:premiseUserDispatch.premiseUserData
      });
      await updateDoc(doc(database, "Users", uid), {
        nRooms: nRooms + 1,
        // smifi:premiseUserDispatch.premiseUserData
      });
    }
    setNewRoom("");
    setRoomFlag(false);
  };
  const handleEditRoom = (count) => {
    setRoomCount(count);
    handleOpen();
  };
  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const openPinModal = () => {
    setPinOpen(true);
  };
  const closePinModal = () => setPinOpen(false);
  const submitOldRoom = async (e) => {
    e.preventDefault();
    console.log(roomCount);
    if (oldRoom != "") {
      await updateDoc(doc(database, "Rooms", uid + "_" + roomCount), {
        name: oldRoom,
      });
    }
    setOldRoom("");
    setRoomCount();
    setOpen(false);
  };
  const createNewRoom = async () => {
    let smifiVal = selectedSmifi["anchorKey"];
    let pinVal = parseInt(selectedPin["anchorKey"]);
    // console.log(changeRoomFlag,oldSmifi,oldPin,oldAppName);
    if (changeRoomFlag == 0) {
    if (smifiVal != undefined && pinVal != undefined&&appId&&appNo) {
        
        await updateDoc(doc(database, "Rooms", uid + "_" + (roomNo + 1)), {
          smifi: arrayUnion(smifiVal),
          [smifiVal]: arrayUnion(pinVal),
          [smifiVal + "_" + pinVal]: arrayUnion(appId + " - " + appNo),
        });
    }
      }
      if (changeRoomFlag == 1) {
        let currentRoom = premiseRoomsState.premiseRoomsData[roomNo];
        // console.log(currentRoom[oldSmifi+'_'+oldPin])
        if(pinVal!=oldPin){
        let data = currentRoom[oldSmifi+'_'+oldPin]
        await setDoc(doc(database, "Rooms", uid + "_" + (roomNo + 1)), {
          [oldSmifi]:arrayUnion(pinVal),
          [oldSmifi + "_" + pinVal]: data,
        },{ merge: true });
        await updateDoc(doc(database, "Rooms", uid + "_" + (roomNo + 1)), {
          [oldSmifi]:arrayRemove(oldPin),
          [oldSmifi + "_" + oldPin]: deleteField(),
        });
      }
    }
    if(changeRoomFlag==2){
        if (appId && appNo) {
          await updateDoc(doc(database, "Rooms", uid + "_" + (roomNo + 1)), {
            [oldSmifi + "_" + oldPin]: arrayUnion(appId + " - " + appNo),
          });
          await updateDoc(doc(database, "Rooms", uid + "_" + (roomNo + 1)), {
            [oldSmifi + "_" + oldPin]: arrayRemove(oldAppName),
          }); 
        }
      }
    
    setPinOpen(false);
    setSelectedPin("Pin");
    setSelectedSmifi("Smifi");
    setAppId("");
    setAppNo("");
  };
  const handleDeleteRow = async (device,pin,applName) =>{
    const delRef = doc(database,"Rooms",uid+'_'+(roomNo+1));
    await updateDoc(delRef, {
      [device+'_'+pin]: arrayRemove(applName)
  });
  let docSnap = await getDoc(delRef);
  if (docSnap.exists()) {
    if(docSnap.data()[device+'_'+pin].length==0){
      await updateDoc(delRef, {
        [device+'_'+pin]: deleteField(),
        [device]:arrayRemove(pin)
    });
    }
  } 
  docSnap = await getDoc(delRef);
  if (docSnap.exists()) {
    if(docSnap.data()[device].length==0){
      await updateDoc(delRef, {
        [device]: deleteField(),
        smifi:arrayRemove(device)
    });
    }
  }

}
const deleteRoom = async () => {
  await deleteDoc(doc(database, "Rooms", uid + "_" + roomCount))
  await updateDoc(doc(database, "Users", uid), {
    nRooms: nRooms - 1,
    // smifi:premiseUserDispatch.premiseUserData
  });
}
  let pinNo, applianceName;
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
          Welcome &nbsp;&nbsp; {premiseUserState.premiseUserData?(premiseUserState.premiseUserData.name):null}

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
          onChange={e=>setPhoneNo(e.target.value)}
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
          fontWeight:"bold",
          letterSpacing:"0.5px",
          fontSize:"17px"

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
      {premiseRoomsState.premiseRoomsData ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "35px",
            }}
          >
            <div style={{ fontSize: "17px", fontWeight: "bold" }}>
              Smifi <br />
              Information
            </div>
            <div
              onClick={handleNewSmifi}
              style={{
                fontSize: "17px",
                background: "#D9D9D9",
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                fontWeight: "bold",
                border: "1px solid black",
                padding: "5px",
              }}
            >
              <AddIcon />
              &nbsp;New
              <br />
              Smi-Fi
            </div>
            <div style={{ fontSize: "17px", fontWeight: "bold" }}>
              Domain List
            </div>
            <div
              onClick={handleNewRoom}
              style={{
                fontSize: "17px",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                border: "1px solid black",
                padding: "5px",
                marginLeft: "100px",
                background: "#D9D9D9",
                cursor: "pointer",
              }}
            >
              <AddIcon />
              &nbsp;New <br />
              Room{" "}
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
                  marginLeft: "12vw",
                  border: "1px solid black",
                  padding: "5px",
                  background: "#D9D9D9",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setChangeRoomFlag(0);
                  openPinModal();
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
              {premiseUserState.premiseUserData?.smifis.map((smifi, count) => (
                <div
                  key={count}
                  style={{
                    marginTop: "20px",
                    marginLeft: "30px",
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
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      deleteSmifi(count);
                    }}
                    sx={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                </div>
              ))}
              {smifiFlag ? (
                <div
                  style={{
                    marginTop: "20px",
                    marginLeft: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    id="smifiId"
                    // value={smifi}
                    onChange={handleSmifiChange}
                    style={{
                      width: "9vw",
                      border: "none",
                      padding: "15px",
                      paddingLeft: "20px",
                      // paddingRight: "-10px",
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  <Button
                    sx={{ marginTop: "5px" }}
                    onClick={handleSmifiSubmit}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </div>
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-around",
                alignItems: "center",
                marginLeft: "6vw",
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
                    }}
                    type="text"
                    value={`${roomName.name}`}
                    readOnly
                    style={{
                      marginLeft: "1vw",
                      cursor: "pointer",
                      width: "15vw",
                      border: "none",
                      padding: "15px",
                      paddingLeft: "20px",
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  <EditIcon
                    onClick={() => {
                      handleEditRoom(count + 1);
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
                      handleDialogOpen(count + 1);
                    }}
                    sx={{
                      marginLeft: "5px",
                      padding: "3px",
                      cursor: "pointer",
                      backgroundColor: "black",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                </div>
              ))}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <form onSubmit={submitOldRoom}>
                      <input
                        id="oldRoom"
                        placeholder="Enter new Room name"
                        onChange={(e) => setOldRoom(e.target.value)}
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
              {roomFlag ? (
                <div
                  style={{
                    marginTop: "20px",
                    marginLeft: "-5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    // value="Living Room Lights"
                    id="roomId"
                    onChange={handleRoomChange}
                    style={{
                      // marginLeft: "1vw",
                      width: "15vw",
                      border: "none",
                      padding: "15px",
                      paddingLeft: "20px",
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  <Button
                    sx={{ marginTop: "5px" }}
                    onClick={handleRoomSubmit}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </div>
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent:"space-between",
                marginLeft: "6vw",
                // marginRight:"20px"
              }}
            >
              {premiseRoomsState.premiseRoomsData
                ? premiseUserState.premiseUserData?.smifis.map(
                    (device, counter) => (
                      (pinNo = premiseRoomsState.premiseRoomsData[roomNo]?premiseRoomsState.premiseRoomsData[roomNo][device]:null),
                      pinNo
                        ? pinNo.map((pin) =>
                            pin
                              ? ((applianceName =
                                  premiseRoomsState.premiseRoomsData[roomNo][
                                    `${device}_${pin}`
                                  ]),
                                applianceName
                                  ? applianceName.map((applName, coun) =>
                                      applName ? (
                                        <div
                                          key={Math.random()}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            fontSize: "17px",
                                            background: "#D9D9D9",
                                            padding: "15px",
                                            marginTop: "20px",
                                            width: "41.5vw",
                                          }}
                                        >
                                          <div>{device}</div>
                                          <div style={{display:"flex",justifyContent:"center"}}>Pin {pin}
                                          
                                          <EditIcon
                                              style={{
                                                cursor: "pointer",
                                                marginLeft:"15px"
                                              }}
                                              onClick={() => {
                                                setChangeRoomFlag(1);
                                                setOldSmifi(device);
                                                setOldPin(pin)
                                                setOldAppName(applName)
                                                openPinModal();
                                              }}
                                            />

                                                </div>
                                          <div style={{display:"flex",justifyContent:"center"}}>{applName}
                                          
                                          <EditIcon
                                              style={{
                                                cursor: "pointer",
                                                marginLeft:"15px"
                                              }}
                                              onClick={() => {
                                                setChangeRoomFlag(2);
                                                setOldSmifi(device);
                                                setOldPin(pin)
                                                setOldAppName(applName)
                                                openPinModal();
                                              }}
                                            />
                                                </div>
                                          <div>100 W</div>
                                           
                                            <DeleteIcon
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              onClick={()=>{
                                                handleDeleteRow(device,pin,applName)
                                              }}
                                            />
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
        </div>
      ) : null}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={pinOpen}
        onClose={closePinModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={pinOpen}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            {changeRoomFlag==0?(
            <Dropdown>
                <Dropdown.Button
                  flat
                  color="light"
                  css={{
                    fontSize: "$lg",
                    marginTop:"$11"
                  }}
                >
                  {selectedSmifi}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedSmifi}
                  onSelectionChange={setSelectedSmifi}
                  css={{
                    fontSize: "$lg",
                  }}
                >
                  <Dropdown.Item key="Smi-Fi">Smi-Fi</Dropdown.Item>
                  {premiseUserState.premiseUserData?.smifis.map((val) => (
                    <Dropdown.Item key={val}>{val}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              ):null}
              {changeRoomFlag==1||changeRoomFlag==0?(
              <Dropdown>
                  <Dropdown.Button
                    flat
                    color="light"
                    css={{
                      fontSize: "$lg",
                      marginTop: "$10",
                    }}
                  >
                    {selectedPin}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="primary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedPin}
                    onSelectionChange={setSelectedPin}
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
                ):null}
                {changeRoomFlag==0||changeRoomFlag==2?
                (<>
                <input
                  type="text"
                  // value="Living Room Lights"
                  id="appId"
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="Enter Appliance Name"
                  // onChange={handleApplianceChange}
                  style={{
                    // marginLeft: "1vw",
                    marginTop: "28px",
                    fontSize: "16px",
                    width: "100%",
                    border: "none",
                    borderRadius: "14px",
                    padding: "15px",
                    paddingLeft: "20px",
                    backgroundColor: "#F0F0F0",
                  }} /><input
                  type="number"
                  // value="Living Room Lights"
                  id="appNo"
                  onChange={(e) => setAppNo(e.target.value)}
                  placeholder="Enter Appliance Number"
                  // onChange={handleApplianceChange}
                  // readOnly={inputEdit}
                  style={{
                    // marginLeft: "1vw",
                    marginTop: "28px",
                    fontSize: "16px",
                    width: "100%",
                    border: "none",
                    borderRadius: "14px",
                    padding: "15px",
                    paddingLeft: "20px",
                    backgroundColor: "#F0F0F0",
                  }} />
                  </>
                  ):null}
                  <Button
                    variant="contained"
                    sx={{ borderRadius: "10px", marginTop: "28px",marginBottom:"30px" }}
                    onClick={() => createNewRoom()}
                    >
                  Submit
                </Button>
          </Box>
        </Fade>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete this item
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
           deleteRoom();
           handleDialogClose();
          }} autoFocus>
            Agree
          </Button>
          <Button onClick={handleDialogClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const userRole = "admin";
export default Premise;
Premise.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
