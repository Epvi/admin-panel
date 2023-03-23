import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { database } from "../../firebaseConfig";
import { doc, updateDoc, arrayRemove, FieldValue } from "firebase/firestore";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DeleteIcon from "@mui/icons-material/Delete";

import userTokenstyles from "../../styles/UserTokenBox.module.css";

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
  const [foundUser, setFoundUser] = useState(true);
  const [phoneNo, setPhoneNo] = useState(true);

  const [name, setName] = useState("");
  const [openName, setOpenName] = useState(false);

  const [address, setAddress] = useState("");
  const [openAddress, setOpenAddress] = useState(false);

  const [email, setEmail] = useState("");
  const [openEmail, setOpenEmail] = useState(false);

  const [newPhone, setNewPhone] = useState(0);
  const [openNewPhone, setOpenNewPhone] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [openProfileImage, setOpenProfileImage] = useState(false);

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

  useEffect(() => {
    if (JSON.stringify(userInformationState.userInformation) == "{}") {
      // if (!userInformationState.userInformation) {
      // console.log("No User Found");
      setFoundUser(false);
    } else {
      setFoundUser(true);
    }
  }, [userInformationState.userInformation]);

  // console.log(userInformationState.userInformation);

  const handleNameChange = async (e) => {
    e.preventDefault();
    console.log(name);
    if (name != "") {
      await updateDoc(doc(database, "Users", uid), {
        name: name,
      });
    }
    setOpenName(false);
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    console.log(typeof email);
    if (email != "") {
      await updateDoc(doc(database, "Users", uid), {
        email: email,
      });
    }
    setOpenEmail(false);
  };

  const handleAddressChange = async (e) => {
    e.preventDefault();
    console.log(address);
    if (address != "") {
      await updateDoc(doc(database, "Users", uid), {
        location: address,
      });
    }
    setOpenAddress(false);
  };

  const handlePhoneChange = async (e) => {
    e.preventDefault();
    const nNum = parseInt(newPhone);
    // console.log(typeof nNum);
    if (newPhone.length == 10) {
      await updateDoc(doc(database, "Users", uid), {
        phone: nNum,
      });
      // make a new search as the phone number is edited
      setPhoneNo(nNum);
      await getData(userInformationDispatch, userInformation, nNum);
    } else {
      alert("Enter Valid Phone Number!");
    }
    setOpenNewPhone(false);
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    if (profileImage != "") {
      await updateDoc(doc(database, "Users", uid), {
        image: profileImage,
      });
    } else {
      alert("Please provide a proper URL!");
    }
    setOpenProfileImage(false);
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
          <form onSubmit={submit}>
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
              onClick={submit}
            >
              Search
            </Button>
          </form>
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
        {userInformationState.userInformation &&
          JSON.stringify(userInformationState.userInformation) != "{}" && (
            <>
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
                  {/* Name */}
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
                        setOpenName(true);
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
                    open={openName}
                    onClose={() => setOpenName(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={openName}>
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
                  {/* Email */}
                  <p>
                    Email :&nbsp;{" "}
                    <input
                      type="text"
                      value={
                        userInformationState.userInformation
                          ? userInformationState.userInformation.email
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
                        setOpenEmail(true);
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
                    open={openEmail}
                    onClose={() => setOpenEmail(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={openEmail}>
                      <Box sx={style}>
                        <form onSubmit={handleEmailChange}>
                          <input
                            id="oldEmailNumber"
                            placeholder="Enter new email address"
                            onChange={(e) => setEmail(e.target.value)}
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
                  {/* address */}
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
                        setOpenAddress(true);
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
                    open={openAddress}
                    onClose={() => setOpenAddress(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={openAddress}>
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
                  {/* phone */}
                  <p>
                    phone :&nbsp;{" "}
                    <input
                      type="text"
                      value={
                        userInformationState.userInformation
                          ? userInformationState.userInformation.phone
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
                        setOpenNewPhone(true);
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
                    open={openNewPhone}
                    onClose={() => setOpenNewPhone(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={openNewPhone}>
                      <Box sx={style}>
                        <form onSubmit={handlePhoneChange}>
                          <input
                            id="oldPhone"
                            placeholder="Enter new phone number"
                            onChange={(e) => setNewPhone(e.target.value)}
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
                  {/* Profile Image */}
                  <p>
                    Image URL :&nbsp;{" "}
                    <input
                      type="text"
                      value={
                        userInformationState.userInformation
                          ? userInformationState.userInformation.image
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
                        setOpenProfileImage(true);
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
                    open={openProfileImage}
                    onClose={() => setOpenProfileImage(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={openProfileImage}>
                      <Box sx={style}>
                        <form onSubmit={handleImageChange}>
                          <input
                            id="oldImage"
                            placeholder="Enter new image url"
                            onChange={(e) => setProfileImage(e.target.value)}
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
                  {/* Number of device */}
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
                  {/* Number of Schedules */}
                  <p>
                    Number of Schedules :&nbsp;{" "}
                    <input
                      type="text"
                      value={
                        userInformationState.userInformation
                          ? userInformationState.userInformation.nSchedules
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
              <div className={userTokenstyles.endHrLine}></div>
              <div className={userTokenstyles.main}>
                {userInformationState.userInformation.tokens ? (
                  <UserTokenList
                    data={userInformationState.userInformation.tokens}
                  />
                ) : (
                  <div>No Token found</div>
                )}
                {userInformationState.userInformation.activitiesQueue ? (
                  <ActivityList
                    data={userInformationState.userInformation.activitiesQueue}
                  />
                ) : (
                  <div>No user activity found</div>
                )}
              </div>
            </>
          )}
      </div>
    </Layout>
  );
};

function UserTokenList({ data }) {
  const { userInformationState, userInformationDispatch } =
    useUserInformation();

  const handleDeleteToken = async (el, index) => {
    if (index < userInformationState.userInformation?.tokens.length) {
      await updateDoc(
        doc(database, "Users", userInformationState.userInformation.uid),
        {
          tokens: arrayRemove(el),
        }
      );
    }
  };
  return (
    <>
      <div className={userTokenstyles.container}>
        <div className={userTokenstyles.header}>Token List</div>
        {data.map((el, index) => {
          return (
            <div className={userTokenstyles.singleElement} key={index}>
              <DeleteIcon
                onClick={() => handleDeleteToken(el, index)}
                sx={{ marginLeft: "5px", cursor: "pointer" }}
              />
              <div>{el}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ActivityList({ data }) {
  return (
    <>
      <div className={userTokenstyles.container}>
        <div className={userTokenstyles.header}>Activity List</div>
        {data.map((el, index) => {
          return (
            <div className={userTokenstyles.singleElementActivity} key={index}>
              <div>{index + 1}.</div>
              <div>{el}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const userRole = "admin";
export default withProtected(Information);
Information.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
