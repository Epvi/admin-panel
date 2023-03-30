import { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import {
  doc,
  collection,
  updateDoc,
  deleteDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Dropdown, css } from "@nextui-org/react";

import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
// import DeleteIcon from "@mui/icons-material/Delete";

import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { getData, useUser } from "../auth/userReducer";

import Layout from "../components/Layout";
import { withProtected } from "../src/hooks/routes";

import styles from "../styles/Users.module.css";

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

function UsersData() {
  const { userState, userDispatch } = useUser();

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const [reload, setReload] = useState(null);
  const [userUID, setUserUID] = useState(null);

  const [chooseField, setChooseField] = useState(null);
  const [newValue, setNewValue] = useState(null);
  const [openChooseField, setOpenChooseField] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);

  const [deviceName, setDeviceName] = useState(null);
  const [deviceList, setDeviceList] = useState([]);
  const [openDeviceDialog, setOpenDeviceDialog] = useState(false);
  const [openAddDeviceModal, setOpenAddDeviceModal] = useState(false);
  const [openDeleteDeviceModal, setOpenDeleteDeviceModal] = useState(false);
  const [openDeleteDeviceDialog, setOpenDeleteDeviceDialog] = useState(false);

  const userArray = [];
  useEffect(() => {
    getData(userDispatch, userArray);
  }, [reload]);

  const resetModals = () => {
    setOpenDeviceDialog(false);
    setOpenAddDeviceModal(false);
    setOpenDeleteDeviceDialog(false);
    setOpenDeleteDeviceModal(false);
    setOpenChooseField(false);
    setOpenDelete(false);
    setOpenAddUser(false);
  };
  const resetValue = () => {
    setDeviceList([]);
    setDeviceName(null);
    setUserUID(null);
    setNewValue(null);
    setReload(!reload);
  };

  const handleSelectedField = async (e) => {
    e.preventDefault();
    const fieldValue = chooseField["anchorKey"];
    const userId = userUID.trim();
    // console.log("Inside handleSeletedField uid:", userId);
    // console.log("Inside handleSeletedField field:", fieldValue);
    // console.log("Inside handleSeletedField newValue:", newValue);
    const dofRef = doc(database, "Users", userId);

    if (fieldValue === "name") {
      // Update the name value
      try {
        await updateDoc(dofRef, {
          name: newValue,
        });
      } catch (error) {
        console.log(error);
      }
      // resetValue();
    } else if (fieldValue === "email") {
      // update the email value
      try {
        await updateDoc(dofRef, {
          email: newValue,
        });
      } catch (error) {
        console.log(error);
      }
      // resetValue();
    } else if (fieldValue === "phone") {
      // update the phone number
      try {
        const num = parseInt(newValue);
        if (num !== NaN) {
          await updateDoc(dofRef, {
            phone: num,
          });
        } else {
          alert("Please Enter numeric value!");
        }
      } catch (error) {
        console.log(error);
      }
      // resetValue();
    } else if (fieldValue === "nRooms") {
      // update the rooms
      try {
        const nroom = parseInt(newValue);
        if (nroom !== NaN) {
          await updateDoc(dofRef, {
            nRooms: nroom,
          });
        } else {
          alert("Please Enter numeric value!");
        }
      } catch (error) {
        console.log(error);
      }
      // resetValue();
    } else if (fieldValue === "nSchedules") {
      // update the schedules
      try {
        const nschedule = parseInt(newValue);
        if (nschedule !== NaN) {
          await updateDoc(dofRef, {
            nSchedules: nschedule,
          });
        } else {
          alert("Please Enter numeric value!");
        }
      } catch (error) {
        console.log(error);
      }
      // resetValue();
    } else {
      setNewValue(null);
      alert("Please select the field it's value to update!");
    }
    // reset
    resetValue();
    resetModals();
  };

  const handleDeleteUser = async () => {
    const userId = userUID?.trim();
    // console.log("User Deleted:", userId);
    if (userId !== null) {
      try {
        await deleteDoc(doc(database, "Users", userId));
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      alert("No device Found!");
    }
    resetModals();
    resetValue();
  };

  const handleCreateNewUser = async (e) => {
    e.preventDefault();
    const newDocRef = doc(collection(database, "Users"));
    await setDoc(newDocRef, {
      activitiesQueue: [],
      email: userEmail,
      location: userLocation,
      nRooms: 0,
      nSchedules: 0,
      name: userName,
      order: [],
      phone: userPhone,
      smifis: [],
      subscribed: false,
      timestamp: Date.now(),
      tokens: [],
      uid: newDocRef.id,
    });

    resetModals();
    resetValue();
  };

  const handleCreateNewDevice = async (e) => {
    e.preventDefault();
    const deviceId = deviceName?.trim();
    const userId = userUID?.trim();

    if (deviceName !== null && userId !== null) {
      try {
        const dofRef = doc(database, "Users", userId);
        await setDoc(
          dofRef,
          {
            smifis: arrayUnion(deviceId),
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please select a deivce or user!");
    }
    resetModals();
    resetValue();
  };

  const handleDeleteDevice = async (e) => {
    e.preventDefault();
    const deviceId = deviceName["anchorKey"];
    const userId = userUID?.trim();

    try {
      if (userUID !== null && deviceId) {
        const dofRef = doc(database, "Users", userId);
        await setDoc(
          dofRef,
          {
            smifis: arrayRemove(deviceId),
          },
          { merge: true }
        );
      } else {
        alert("Please select a user or device!");
      }
    } catch (error) {
      console.log(error);
    }

    resetModals();
    resetValue();
  };

  const columns = [
    { field: "id", headerName: "Sr", flex: 0.2 },
    { field: "userUID", headerName: "User Id", flex: 0.5, hide: true },
    { field: "name", headerName: "Name", flex: 0.9 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "phone", headerName: "Phone", flex: 0.7 },
    { field: "smifis", headerName: "Smifis", flex: 0.4 },
    { field: "smifisList", headerName: "SmifisList", flex: 0.4, hide: true },
    {
      field: "editSmifi",
      headerName: "Setup-Device",
      flex: 0.6,
      renderCell: (cellValues) => {
        return (
          <Button
            color="primary"
            onClick={() => {
              setUserUID(cellValues.row.userUID);
              setDeviceList(cellValues.row.smifisList);
              setOpenDeviceDialog(true);
            }}
          >
            Setup
          </Button>
        );
      },
    },
    { field: "nRooms", headerName: "nRooms", flex: 0.4 },
    { field: "nSchedules", headerName: "Schedules", flex: 0.5 },
    { field: "subscribed", headerName: "Subscribed", flex: 0.5 },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 0.4,
      // width: 100,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setUserUID(cellValues.row.userUID);
              setOpenChooseField(true);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 0.4,
      // width: 100,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setUserUID(cellValues.row.userUID);
              setOpenDelete(true);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Layout userRole={"admin"}>
      <div className={styles.addBtnContainer}>
        Add new user
        <AddBoxIcon
          sx={{
            marginLeft: "10px",
            padding: "3px",
            cursor: "pointer",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => setOpenAddUser(true)}
        />
      </div>
      {/* Grid data */}
      <div
        style={{
          marginRight: "15px",
          marginTop: "15px",
          height: "85vh",
          width: "100%",
        }}
      >
        {userState.userArray ? (
          <DataGrid
            getRowId={(row) => row.id}
            getEstimatedRowHeight={() => 52}
            // getRowHeight={() => "auto"}
            rows={userState.userArray.map((row, index) => ({
              id: index,
              userUID: row.uid,
              name: row.name,
              email: row.email,
              phone: row.phone,
              smifis: row.smifis?.length,
              smifisList: row.smifis,
              nRooms: row.nRooms,
              nSchedules: row.nSchedules,
              subscribed: row.subscribed ? "True" : "False",
            }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        ) : (
          <CircularProgress sx={{ marginLeft: "45%", marginTop: "15px" }} />
        )}
      </div>
      {/* Dialog - user delete */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDeleteUser();
              setOpenDelete(false);
            }}
            autoFocus
          >
            Agree
          </Button>
          <Button onClick={() => setOpenDelete(false)}>Disagree</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog - add or delete - smifi */}
      <Dialog
        open={openDeviceDialog}
        onClose={() => setOpenDeviceDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Choose Add device to add new smifi or delete to delete one.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeviceDialog(false);
              setOpenAddDeviceModal(true);
            }}
            autoFocus
          >
            Add Device
          </Button>
          <Button
            onClick={() => {
              setOpenDeviceDialog(false);
              setOpenDeleteDeviceModal(true);
            }}
          >
            Delete Device
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog - delete smifi */}
      <Dialog
        open={openDeleteDeviceDialog}
        onClose={() => setOpenDeleteDeviceDialog(false)}
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
              handleDeleteDevice();
              setOpenDeleteDeviceDialog(false);
            }}
            autoFocus
          >
            Agree
          </Button>
          <Button onClick={() => setOpenDeleteDeviceDialog(false)}>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
      {/* Choose field modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openChooseField}
        onClose={() => setOpenChooseField(false)}
        closeAfterTransition
      >
        <Fade in={openChooseField}>
          <Box sx={style}>
            <form onSubmit={handleSelectedField}>
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
                  Select Field : {chooseField}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={chooseField}
                  onSelectionChange={setChooseField}
                  width="$12"
                  css={{
                    fontSize: "$lg",
                  }}
                >
                  <Dropdown.Item key="name">Name</Dropdown.Item>
                  <Dropdown.Item key="email">Email</Dropdown.Item>
                  <Dropdown.Item key="phone">Phone</Dropdown.Item>
                  <Dropdown.Item key="nRooms">Number of Rooms</Dropdown.Item>
                  <Dropdown.Item key="nSchedules">
                    Number of Schedules
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <input
                id="newValue"
                placeholder="Enter value to update..."
                onChange={(e) => setNewValue(e.target.value)}
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
      {/* Add new user Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddUser}
        onClose={() => setOpenAddUser(false)}
        closeAfterTransition
      >
        <Fade in={openAddUser}>
          <Box sx={style}>
            <form onSubmit={handleCreateNewUser}>
              <label htmlFor="userName">Name</label>
              <input
                id="userName"
                placeholder="Enter your name..."
                onChange={(e) => setUserName(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <label htmlFor="userEmail">Email</label>
              <input
                id="userEmail"
                placeholder="Enter your email..."
                type="email"
                onChange={(e) => setUserEmail(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <label htmlFor="userPhone">Phone</label>
              <input
                id="userPhone"
                type="number"
                placeholder="Enter your phone number..."
                onChange={(e) => setUserPhone(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <label htmlFor="userLocation">Location</label>
              <input
                id="userLocation"
                placeholder="Enter your current location..."
                onChange={(e) => setUserLocation(e.target.value)}
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
      {/* Add Device modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddDeviceModal}
        onClose={() => setOpenAddDeviceModal(false)}
        closeAfterTransition
      >
        <Fade in={openAddDeviceModal}>
          <Box sx={style}>
            <form onSubmit={handleCreateNewDevice}>
              <label htmlFor="deviceName">Add device</label>
              <input
                id="deviceName"
                placeholder="Enter device name..."
                required
                onChange={(e) => setDeviceName(e.target.value)}
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
      {/* Delete device modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDeleteDeviceModal}
        onClose={() => setOpenDeleteDeviceModal(false)}
        closeAfterTransition
      >
        <Fade in={openDeleteDeviceModal}>
          <Box sx={style}>
            <form onSubmit={handleDeleteDevice}>
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
                  Device delete : {deviceName}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={deviceName}
                  onSelectionChange={setDeviceName}
                  width="$12"
                  css={{
                    fontSize: "$lg",
                  }}
                >
                  {deviceList?.map((el, index) => {
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
    </Layout>
  );
}

const userRole = "admin";
UsersData.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};

export default withProtected(UsersData);
