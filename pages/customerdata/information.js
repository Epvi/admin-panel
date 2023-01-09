import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { database } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { getData, useUserInformation } from "../../auth/informationReducer";
import Layout from "../../components/Layout";
import { withProtected } from "../../src/hooks/routes";

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

const Information = () => {
  const { userInformationState, userInformationDispatch } =
    useUserInformation();
  const [phoneNo, setPhoneNo] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const { asPath, pathname } = useRouter();
  const styling = {
    backgroundColor: "#556cd6",
    color: "white",
  };
  const userInformation = {};
  let uid = userInformationState.userInformation
    ? userInformationState.userInformation.uid
    : null;

  const handleClick = (index) => {
    if (index == 1) Router.push("/customerdata/information");
    if (index == 2) Router.push("/customerdata/premise");
    if (index == 3) Router.push("/customerdata/tracking");
    if (index == 4) Router.push("/customerdata/service");
    if (index == 5) Router.push("/customerdata/raiseticket");
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(phoneNo);
    if (phoneNo.length == 10) {
      await getData(userInformationDispatch, userInformation, phoneNo);
    } else {
      alert("Enter Valid Phone No");
    }
  };
  // console.log(userInformationState.userInformation);

  const handleNameChange = async (e) => {
    e.preventDefault();
    console.log(name);
    if (name != "") {
      await updateDoc(doc(database, "Users", uid), {
        name: name,
      });
    }
    setOpen(false);
  };

  const handleAddressChange = async (e) => {
    e.preventDefault();
    console.log(address);
    if (address != "") {
      await updateDoc(doc(database, "Users", uid), {
        location: address,
      });
    }
    setOpen(false);
  };

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
        {/* user information */}
        {userInformationState.userInformation && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            {/* Personal info */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                General Information <br />
              </div>
              <p>
                User Name :&nbsp;{" "}
                <input
                  type="text"
                  value={
                    userInformationState.userInformation
                      ? userInformationState.userInformation.name
                      : ""
                  }
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
                <EditIcon
                  onClick={() => {
                    setOpen(true);
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
              </p>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <form onSubmit={handleNameChange}>
                      <input
                        id="oldName"
                        placeholder="Enter new name"
                        onChange={(e) => setName(e.target.value)}
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
              <p>
                Address :&nbsp;{" "}
                <input
                  type="text"
                  value={
                    userInformationState.userInformation
                      ? userInformationState.userInformation.location
                      : ""
                  }
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
                <EditIcon
                  onClick={() => {
                    setOpen(true);
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
              </p>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <form onSubmit={handleAddressChange}>
                      <input
                        id="oldAddress"
                        placeholder="Enter new Address"
                        onChange={(e) => setAddress(e.target.value)}
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
            {/* Purchase info */}
            <div>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Purchase Information <br />
              </div>
              <p>
                Purchase Amount :&nbsp;{" "}
                <input
                  type="text"
                  value={"No Data"}
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
              </p>
              <p>
                Purchase Date :&nbsp;{" "}
                <input
                  type="text"
                  value={"No Data"}
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
              </p>
              <p>
                Membership Starts :&nbsp;{" "}
                <input
                  type="text"
                  value={"No Data"}
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
              </p>
              <p>
                Membership Ends :&nbsp;{" "}
                <input
                  type="text"
                  value={"No Data"}
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
              </p>
              <p>
                Number of Smifi :&nbsp;{" "}
                <input
                  type="text"
                  value={
                    userInformationState.userInformation
                      ? userInformationState.userInformation.smifis.length
                      : ""
                  }
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
              </p>
            </div>
            {/* Renewal Info */}
            <div>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Renewal Information <br />
              </div>
              <p>
                Subscription Amount :&nbsp;{" "}
                <input
                  type="text"
                  value={"No Data"}
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
              </p>
              <p>
                Renewal Date :&nbsp;
                <input
                  type="text"
                  value={"No Data"}
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
              </p>
              <p>
                Renewal Ends :&nbsp;
                <input
                  type="text"
                  value={"No Data"}
                  readOnly
                  style={{
                    marginLeft: "1vw",
                    width: "auto",
                    border: "none",
                    padding: "15px",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    backgroundColor: "#D9D9D9",
                  }}
                />
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
const userRole = "admin";
export default withProtected(Information);
Information.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
