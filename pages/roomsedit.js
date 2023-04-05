import React from "react";
import { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import {
  doc,
  getDocs,
  setDoc,
  collection,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
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
import { Dropdown, css } from "@nextui-org/react";

import { getData, useRoomData } from "../auth/RoomsDataReducer";
import Layout from "../components/Layout";
import { withProtected } from "../src/hooks/routes";

import styles from "../styles/Rooms.module.css";

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

const CouponsPage = () => {
  const { roomState, roomDispatch } = useRoomData();
  const [reload, setReload] = useState(false);
  const [cleanDisplay, setCleanDisplay] = useState(false);

  const [docList, setDocList] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [addFieldModal, setAddFieldModal] = useState(false);

  const [chooseField, setChooseField] = useState(null);

  const [newVal, setNewVal] = useState(null);
  const [openNameModal, setOpenNameModal] = useState(null);
  const [openUIDModal, setOpenUIDModal] = useState(null);

  const [newDevice, setNewDevice] = useState(null);
  const [openNewDeviceModal, setOpenNewDeviceModal] = useState(false);
  const [deleteDeviceDialog, setDeleteDeviceDialog] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [openFieldDialog, setOpenFieldDialog] = useState(false);

  const [openAddRoomModal, setOpenAddRoomModal] = useState(false);
  const [openAddValueToFieldModal, setOpenAddValueToFieldModal] =
    useState(false);

  const [openDeleteFieldValueModal, setOpenDeleteFieldValueModal] =
    useState(false);

  const resetModal = () => {
    setOpenDeleteFieldValueModal(false);
    setOpenAddValueToFieldModal(false);
    setOpenAddRoomModal(false);
    setOpenFieldDialog(false);
    setAddFieldModal(false);
    setOpenDialog(false);
    setOpenNewDeviceModal(false);
    setDeleteDeviceDialog(false);
    setOpenNameModal(false);
    setOpenUIDModal(false);
  };
  const resetVal = () => {
    setNewVal(null);
    setNewDevice(null);
    setChooseField(null);
    setReload(!reload);
  };

  const handleNameChange = async (e) => {
    e.preventDefault();
    if (selectedDoc === null || selectedDoc === "") {
      alert("Please select a room!");
      return;
    }
    if (newVal === null || newVal === "") {
      alert("Please enter proper value to update!");
      return;
    }
    // console.log("Inside handleValue:", selectedDoc, field, newVal);
    const docRef = doc(database, "Rooms", selectedDoc);
    try {
      await updateDoc(docRef, {
        name: newVal,
      });
    } catch (error) {
      console.log(error);
    }
    resetModal();
    resetVal();
  };
  const handleUIDChange = async (e) => {
    e.preventDefault();
    if (selectedDoc === null || selectedDoc === "") {
      alert("Please select a room!");
      return;
    }
    if (newVal === null || newVal === "") {
      alert("Please enter proper value to update!");
      return;
    }
    const docRef = doc(database, "Rooms", selectedDoc);
    try {
      await updateDoc(docRef, {
        uid: newVal,
      });
    } catch (error) {
      console.log(error);
    }
    resetModal();
    resetVal();
  };
  const handleAddDevice = async (e) => {
    e.preventDefault();
    if (selectedDoc === null || selectedDoc === "") {
      alert("Please select a room!");
      return;
    }
    if (newDevice === null || newDevice === "") {
      alert("Please enter proper value to update!");
      return;
    }
    // console.log("Inside handleValue:", selectedDoc, newDevice);
    try {
      const docRef = doc(database, "Rooms", selectedDoc);
      await updateDoc(docRef, {
        smifi: arrayUnion(newDevice),
      });
    } catch (error) {
      console.log(error);
    }
    resetModal();
    resetVal();
  };
  const handleDeviceDelete = async () => {
    if (selectedDoc === null || selectedDoc === "") {
      alert("Please select a room!");
      return;
    }
    if (newDevice === null || newDevice === "") {
      alert("Please enter proper value to update!");
      return;
    }
    try {
      const docRef = doc(database, "Rooms", selectedDoc);
      await updateDoc(docRef, {
        smifi: arrayRemove(newDevice),
      });
    } catch (error) {
      console.log(error);
    }
    resetModal();
    resetVal();
  };
  const handleDeleteRoom = async () => {
    if (selectedDoc === null || selectedDoc === "") {
      alert("Please select a room!");
      return;
    }
    try {
      const docRef = doc(database, "Rooms", selectedDoc);
      await deleteDoc(docRef);
      setCleanDisplay(true);
    } catch (error) {
      console.log(error);
    }
    resetModal();
    resetVal();
  };
  const handleAddNewField = async (e) => {
    e.preventDefault();
    if (selectedDoc === null || selectedDoc === "") {
      alert("Please select a room!");
      return;
    }
    if (newVal === null || newVal === "") {
      alert("Please enter the field name!");
      return;
    }
    try {
      const docRef = doc(database, "Rooms", selectedDoc);
      await setDoc(docRef, { [newVal]: [] }, { merge: true });
    } catch (error) {
      console.log(error);
    }
    resetModal();
    setReload(!reload);
  };
  const handleDeleteField = async () => {
    if (selectedDoc === null || selectedDoc === "") {
      alert("Please select a room!");
      return;
    }
    if (chooseField === null || chooseField === "") {
      alert("Please choose a field to delete!");
      return;
    }
    try {
      const docRef = doc(database, "Rooms", selectedDoc);
      await setDoc(docRef, { [chooseField]: deleteField() }, { merge: true });
    } catch (error) {
      console.log(error);
    }
    resetModal();
    resetVal();
  };
  const handleAddNewRoom = async (e) => {
    e.preventDefault();
    if (newVal === null || newVal === "") {
      alert("Please enter the field name!");
      return;
    }
    const newDocRef = doc(collection(database, "Rooms"));
    try {
      await setDoc(newDocRef, { name: newVal, smifi: [], uid: newDocRef.id });
    } catch (error) {
      console.log(error);
    }
    resetModal();
    resetVal();
    setSelectedDoc(newDocRef.id);
  };
  const handleAddValueToField = async (e) => {
    e.preventDefault();
    if (selectedDoc === null || selectedDoc === "") {
      alert("Please select a room!");
      return;
    }
    if (chooseField === null || chooseField === "") {
      alert("Please choose a field to delete!");
      return;
    }
    if (newVal === null || newVal === "") {
      alert("Please enter the field name!");
      return;
    }
    try {
      const docRef = doc(database, "Rooms", selectedDoc);
      const val = parseInt(newVal);
      // console.log(chooseField, val, newVal);
      await setDoc(
        docRef,
        {
          [chooseField]: arrayUnion(isNaN(val) ? newVal : val),
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
    resetModal();
    resetVal();
  };
  const handleDeleteFieldValue = async (e) => {
    e.preventDefault();
    if (selectedDoc === null || selectedDoc === "") {
      alert("Please select a room!");
      return;
    }
    if (chooseField === null || chooseField === "") {
      alert("Please choose a field to delete!");
      return;
    }
    const val = newVal ? newVal["anchorKey"] : null;
    if (!isNaN(parseInt(val))) {
      val = parseInt(val);
    }
    if (val === null || val === "") {
      alert("Please enter the field name!");
      return;
    }
    try {
      const docRef = doc(database, "Rooms", selectedDoc);
      await setDoc(
        docRef,
        {
          [chooseField]: arrayRemove(val),
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
    resetModal();
    resetVal();
  };

  // to get List of coupons
  useEffect(() => {
    if (selectedDoc != null) {
      async function getMarker() {
        if (selectedDoc != "") {
          try {
            await getData(roomDispatch, selectedDoc);
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("Please select a room!");
        }
      }
      getMarker();
      setCleanDisplay(false);
    } else {
      setCleanDisplay(true);
    }
  }, [selectedDoc, reload]);

  // to get List of Rooms
  useEffect(() => {
    async function getMarker() {
      const collectionRef = collection(database, "Rooms");
      await getDocs(collectionRef).then((querySnapshot) => {
        const docIds = [];
        querySnapshot.docs.forEach((doc) => {
          docIds.push(doc.id);
        });
        setDocList(docIds);
      });
    }
    getMarker();
  }, [reload]);

  return (
    <Layout userRole={"admin"}>
      <div className={styles.main}>
        <div className={styles.headingContainer}>
          <div className={styles.heading1}>Rooms List</div>
          <div className={styles.heading2}>Room Details</div>
        </div>
        <div className={styles.wrapper}>
          {/* left */}
          <div className={styles.couponList}>
            <div className={styles.addbtn}>
              Add new Room
              <AddBoxIcon
                sx={{
                  marginLeft: "10px",
                  padding: "3px",
                  cursor: "pointer",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setOpenAddRoomModal(true)}
              />
            </div>
            {docList?.map((el, index) => {
              return (
                <div
                  key={el}
                  className={`${styles.singleEl} ${
                    selectedDoc === el && styles.activate
                  }`}
                >
                  <div
                    className={styles.decideIdField}
                    onClick={() => {
                      setSelectedDoc(el);
                    }}
                  >
                    {index + 1} : {el}
                  </div>
                  <div className={styles.addbtn}>
                    <DeleteIcon
                      onClick={() => {
                        setSelectedDoc(el);
                        setOpenDialog(true);
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
          {/* right */}
          <div className={styles.couponInfo}>
            {!cleanDisplay && (
              <>
                <div className={styles.addbtn}>
                  Add new field
                  <AddBoxIcon
                    sx={{
                      marginLeft: "10px",
                      padding: "3px",
                      cursor: "pointer",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => setAddFieldModal(true)}
                  />
                </div>
                {roomState?.roomData &&
                  JSON.stringify(roomState?.roomData) != "{}" && (
                    <div className={styles.roomInfowrapper}>
                      <div>
                        <div>
                          <strong>name&nbsp;:&nbsp;</strong>{" "}
                          {roomState.roomData?.name}
                        </div>
                        <div className={styles.edit_delete_btn}>
                          <div className={styles.editBtn}>
                            <EditIcon
                              sx={{
                                display: "inlineBlock",
                                marginLeft: "10px",
                                padding: "3px",
                                cursor: "pointer",
                                color: "white",
                                cursor: "pointer",
                              }}
                              onClick={() => setOpenNameModal(true)}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Smifi container */}
                      <div className={styles.arrayContainer}>
                        <div className={styles.array_supportText}>
                          <div className={styles.supportText}>
                            <strong>Smifi&nbsp;:&nbsp;</strong>
                          </div>
                          <div className={styles.fieldArray}>
                            {roomState.roomData?.smifi?.map((dev, index) => {
                              return (
                                <div
                                  key={index}
                                  className={styles.singleDev_btn}
                                >
                                  <div className={styles.singleDev}>{dev}</div>
                                  <div className={styles.devBtn}>
                                    <DeleteIcon
                                      sx={{
                                        display: "inlineBlock",
                                        padding: "3px",
                                        cursor: "pointer",
                                        color: "white",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setNewDevice(dev);
                                        setDeleteDeviceDialog(true);
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className={styles.edit_delete_btn}>
                          <div className={styles.editBtn}>
                            <AddBoxIcon
                              sx={{
                                display: "inlineBlock",
                                marginLeft: "10px",
                                padding: "3px",
                                cursor: "pointer",
                                color: "white",
                                cursor: "pointer",
                              }}
                              onClick={() => setOpenNewDeviceModal(true)}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <strong>uid&nbsp;:&nbsp;</strong>
                          {roomState.roomData?.uid}
                        </div>
                        <div className={styles.edit_delete_btn}>
                          <div className={styles.editBtn}>
                            <EditIcon
                              sx={{
                                display: "inlineBlock",
                                marginLeft: "10px",
                                padding: "3px",
                                cursor: "pointer",
                                color: "white",
                                cursor: "pointer",
                              }}
                              onClick={() => setOpenUIDModal(true)}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Other fields */}
                      {Object.keys(roomState?.roomData)?.map((key) => {
                        if (
                          key === "name" ||
                          key === "uid" ||
                          key === "smifi"
                        ) {
                          return null;
                        }
                        return (
                          <div className={styles.arrayContainer} key={key}>
                            <div className={styles.array_supportText}>
                              <div className={styles.supportText}>
                                <strong>{`${key} : `}&nbsp;</strong>
                              </div>
                              <div className={styles.restArray}>
                                {roomState?.roomData[key]?.map((keyEl) => {
                                  return <div key={keyEl}>{keyEl}</div>;
                                })}
                              </div>
                            </div>
                            <div className={styles.edit_delete_btn}>
                              <div className={styles.editBtn}>
                                <AddBoxIcon
                                  sx={{
                                    display: "inlineBlock",
                                    marginLeft: "10px",
                                    padding: "3px",
                                    cursor: "pointer",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setChooseField(key);
                                    setOpenAddValueToFieldModal(true);
                                  }}
                                />
                              </div>
                              <div className={styles.editBtn}>
                                <DeleteIcon
                                  sx={{
                                    display: "inlineBlock",
                                    marginLeft: "10px",
                                    padding: "3px",
                                    cursor: "pointer",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setChooseField(key);
                                    setOpenFieldDialog(true);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      {/* Edit name */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openNameModal}
        onClose={() => setOpenNameModal(false)}
        closeAfterTransition
      >
        <Fade in={openNameModal}>
          <Box sx={style}>
            <form onSubmit={handleNameChange}>
              <input
                id="newValue"
                placeholder="Update the field..."
                onChange={(e) => setNewVal(e.target.value)}
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
      {/* edit UID */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openUIDModal}
        onClose={() => setOpenUIDModal(false)}
        closeAfterTransition
      >
        <Fade in={openUIDModal}>
          <Box sx={style}>
            <form onSubmit={handleUIDChange}>
              <input
                id="newValue"
                placeholder="Update the field..."
                onChange={(e) => setNewVal(e.target.value)}
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
      {/* Add new Device to Smifi */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openNewDeviceModal}
        onClose={() => setOpenNewDeviceModal(false)}
        closeAfterTransition
      >
        <Fade in={openNewDeviceModal}>
          <Box sx={style}>
            <form onSubmit={handleAddDevice}>
              <input
                id="newDevice"
                placeholder="Please enter device id..."
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
      {/* Add new Field */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={addFieldModal}
        onClose={() => setAddFieldModal(false)}
        closeAfterTransition
      >
        <Fade in={addFieldModal}>
          <Box sx={style}>
            <form onSubmit={handleAddNewField}>
              <label htmlFor="fieldName">Field Name</label>
              <input
                id="fieldName"
                placeholder="Enter the new Field"
                onChange={(e) => setNewVal(e.target.value)}
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
      {/* Add new Room */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddRoomModal}
        onClose={() => setOpenAddRoomModal(false)}
        closeAfterTransition
      >
        <Fade in={openAddRoomModal}>
          <Box sx={style}>
            <form onSubmit={handleAddNewRoom}>
              <label htmlFor="roomName">Room Name</label>
              <input
                id="roomName"
                placeholder="Enter the room name"
                onChange={(e) => setNewVal(e.target.value)}
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
      {/* Add Any value to field */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddValueToFieldModal}
        onClose={() => setOpenAddValueToFieldModal(false)}
        closeAfterTransition
      >
        <Fade in={openAddValueToFieldModal}>
          <Box sx={style}>
            <form onSubmit={handleAddValueToField}>
              <label htmlFor="roomName"></label>
              <input
                id="roomName"
                placeholder="Please enter the value..."
                onChange={(e) => setNewVal(e.target.value)}
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
      {/* Delete Field value Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDeleteFieldValueModal}
        onClose={() => setOpenDeleteFieldValueModal(false)}
        closeAfterTransition
      >
        <Fade in={openDeleteFieldValueModal}>
          <Box sx={style}>
            <form onSubmit={handleDeleteFieldValue}>
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
                  Select Field Value : {newVal}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={newVal}
                  onSelectionChange={setNewVal}
                  width="$12"
                  css={{
                    fontSize: "$lg",
                  }}
                >
                  {roomState?.roomData &&
                    roomState.roomData[chooseField]?.map((el, index) => {
                      return <Dropdown.Item key={el}>{el}</Dropdown.Item>;
                    })}
                </Dropdown.Menu>
              </Dropdown>
              <Button
                variant="contained"
                color="error"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Delete
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* Dialogs */}
      {/* Delete room dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
              handleDeleteRoom();
              setOpenDialog(false);
            }}
            autoFocus
          >
            Agree
          </Button>
          <Button onClick={() => setOpenDialog(false)}>Disagree</Button>
        </DialogActions>
      </Dialog>
      {/* Delete room field dialog */}
      <Dialog
        open={openFieldDialog}
        onClose={() => setOpenFieldDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Select any operation!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDeleteField();
              setOpenFieldDialog(false);
            }}
            autoFocus
          >
            Delete Field
          </Button>
          <Button
            onClick={() => {
              setOpenDeleteFieldValueModal(true);
              setOpenFieldDialog(false);
            }}
          >
            Delete Field value
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete device dialog */}
      <Dialog
        open={deleteDeviceDialog}
        onClose={() => setOpenFieldDialog(false)}
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
              handleDeviceDelete();
              setDeleteDeviceDialog(false);
            }}
            autoFocus
          >
            Agree
          </Button>
          <Button onClick={() => setDeleteDeviceDialog(false)}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default withProtected(CouponsPage);
