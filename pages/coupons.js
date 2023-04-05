import React from "react";
import { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
// const db = firebase.firestore();
import {
  doc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
  deleteDoc,
  setDoc,
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

import { getData, useCoupon } from "../auth/couponsReducer";
import Layout from "../components/Layout";
import { withProtected } from "../src/hooks/routes";

import styles from "../styles/Coupons.module.css";

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
  const { couponsState, couponsDispatch } = useCoupon();

  const [reload, setReload] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [newCoupon, setNewCoupon] = useState(null);
  const [couponType, setCouponType] = useState(null);
  const [couponVal, setCouponVal] = useState(null);
  // const [couponInfo, setCouponInfo] = useState(null);

  const [docList, setDocList] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const resetModals = () => {
    setOpenDialog(false);
    setOpenAddModal(false);
    setOpenEditModal(false);
  };
  const resetValues = () => {
    setNewCoupon(null);
    setCouponType(null);
    setCouponVal(null);
    setReload(!reload);
  };

  // to get single coupon info on selectedDoc change
  // useEffect(() => {
  //   if (selectedDoc != null && selectedDoc != "") {
  //     const docRef = doc(database, "Coupons", selectedDoc);
  //     // Get the document data
  //     getDoc(docRef)
  //       .then((doc) => {
  //         if (doc.exists()) {
  //           setCouponInfo(doc.data());
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     setCouponInfo(null);
  //   }
  // }, [selectedDoc]);
  // to get single coupon info on selectedDoc change
  useEffect(() => {
    if (selectedDoc != null) {
      const GetCoupon = async (e) => {
        if (selectedDoc != "") {
          await getData(couponsDispatch, selectedDoc);
        } else {
          alert("Couldn't find coupon!");
        }
      };
      GetCoupon();
    }
  }, [selectedDoc]);

  // to get List of coupons
  useEffect(() => {
    async function getMarker() {
      const collectionRef = collection(database, "Coupons");
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

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (
      newCoupon != "" &&
      newCoupon != null &&
      couponType != "" &&
      couponType != null &&
      couponVal != "" &&
      couponVal != null
    ) {
      try {
        const docRef = doc(database, "Coupons", newCoupon);
        const data = {
          [couponType]: couponVal,
        };
        await setDoc(docRef, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Enter coupon Datails!");
      return;
    }
    resetModals();
    resetValues();
  };

  const deleteOffer = async () => {
    if (selectedDoc != null && selectedDoc != "") {
      try {
        await deleteDoc(doc(database, "Coupons", selectedDoc));
        setSelectedDoc(null);
        setCouponInfo(null);
        setReload(!reload);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please select a offer to delete!");
    }
    resetModals();
    resetValues();
  };

  const handleEditCoupon = async (e) => {
    e.preventDefault();
    try {
      const data = { [couponType]: couponVal };
      if (
        couponType != "" &&
        couponType != null &&
        couponVal != "" &&
        couponVal != null
      ) {
        await setDoc(doc(database, "Coupons", selectedDoc), data, {
          merge: false,
        });
        await getData(couponsDispatch, selectedDoc);
        // setCouponInfo(data);
      } else {
        alert("Please Enter coupon Datails!");
        return;
      }
    } catch (error) {
      console.log(error);
    }
    resetModals();
    resetValues();
  };

  return (
    <Layout userRole={"admin"}>
      <div className={styles.main}>
        <div className={styles.headingContainer}>
          <div className={styles.heading1}>Coupons List</div>
          <div className={styles.heading2}>Coupons Details</div>
        </div>
        <div className={styles.wrapper}>
          {/* left */}
          <div className={styles.couponList}>
            <div className={styles.addbtn}>
              Add new coupon
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
            {couponsState.couponInfo &&
              JSON.stringify(couponsState.couponInfo) != "{}" && (
                <div className={styles.couponInfowrapper}>
                  <div>
                    {Object.keys(couponsState.couponInfo)} :
                    {Object.values(couponsState.couponInfo)}
                  </div>
                  <div className={styles.editBtn}>
                    <EditIcon
                      sx={{
                        marginLeft: "10px",
                        padding: "3px",
                        cursor: "pointer",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenEditModal(true)}
                    />
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
      {/* add offer Modal  */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        closeAfterTransition
      >
        <Fade in={openAddModal}>
          <Box sx={style}>
            <form onSubmit={handleAddCoupon}>
              <label htmlFor="newCoupon">Coupon Id</label>
              <input
                id="newCoupon"
                placeholder="Give coupon id..."
                onChange={(e) => setNewCoupon(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  borderRadius: "6px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <label htmlFor="couponType">Coupon type</label>
              <input
                id="couponType"
                placeholder="What is the coupon type..."
                onChange={(e) => setCouponType(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  borderRadius: "6px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <label htmlFor="couponVal"> Value</label>
              <input
                id="couponVal"
                placeholder="Plase enter coupon value..."
                type="number"
                onChange={(e) => setCouponVal(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  borderRadius: "6px",
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
      {/* Edit offer Modal  */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        closeAfterTransition
      >
        <Fade in={openEditModal}>
          <Box sx={style}>
            <form onSubmit={handleEditCoupon}>
              <label htmlFor="couponType">Coupon type</label>
              <input
                id="couponType"
                placeholder="What is the coupon type..."
                onChange={(e) => setCouponType(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  borderRadius: "6px",
                  paddingLeft: "20px",
                  backgroundColor: "#D9D9D9",
                  fontSize: "17px",
                }}
              />
              <label htmlFor="couponVal">Value</label>
              <input
                id="couponVal"
                placeholder="Plase enter coupon value..."
                type="number"
                onChange={(e) => setCouponVal(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "15px",
                  borderRadius: "6px",
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
      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
              deleteOffer();
              setOpenDialog(false);
            }}
            autoFocus
          >
            Agree
          </Button>
          <Button onClick={() => setOpenDialog(false)}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default withProtected(CouponsPage);
