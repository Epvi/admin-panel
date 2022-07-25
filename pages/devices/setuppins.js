import React from "react";
import { useState, useEffect } from "react";
import { getData, useRoomPins } from "../../auth/roomPinsReducer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { database } from "../../firebaseConfig";
import { setDoc, doc,updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Layout from "../../components/Layout";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const SetupPin = () => {
  const { pinState, pinDispatch } = useRoomPins();
  const pinsArray = [];
  useEffect(() => {
    getData(pinDispatch, pinsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [pin, setPin] = useState("Not Selected");
  const validationSchema = yup.object({
    name: yup.string("Enter your name").required("Name is required"),
    smifi: yup.string("Enter your smifi").required("Smifi is required"),
    uid: yup.string("Enter your Uid").required("Uid is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      smifi: "",
      uid: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      let data = [pin];
      let smifis = [values.smifi];
      setDoc(doc(database, "Rooms/" + values.uid + "_7"), {
        name: values.name,
        smifi: smifis,
        uid: values.uid,
        [pinState.selectedDevice]: data,
      });
    },
  });
  const [hover, setHover] = useState(false);
  const hoverStyle = {
    marginLeft: "42%",
    marginTop: "20px",
    cursor: "pointer",
  };
// console.log(pinState.selectedDevice)
  const normalStyle = {
    marginLeft: "42%",
    marginTop: "20px",
  };

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };
  const handleClick1 = () => {
    setPin("1");
  };
  const handleClick2 = () => {
    setPin("2");
  };
  const handleClick3 = () => {
    setPin("3");
  };
  const handleClick4 = () => {
    setPin("4");
  };
  const handleClick5 = () => {
    setPin("5");
  };
  const handleClick6 = () => {
    setPin("6");
  };
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditPin = async (e) => {
    e.preventDefault();
    console.log(name);
   await updateDoc(doc(database, "Rooms/CAEH1Hs8OQRMy3o1SCxhNLljMP42_1"), {
    epvi001:[name]
  });
   setOpen(false);
  }
  // const handleAddPin = (e) => {
  //   e.preventDefault();
  //   console.log(name);
  //  await setDoc(doc(database, "Rooms/CAEH1Hs8OQRMy3o1SCxhNLljMP42_1"), {
  //   epvi001:[name]
  // });
  //  setOpen(false);
  // }
  return (
    <>
      <div style={{ width: "50%", margin: "auto", marginTop: "40px" }}>
        <h2 style={{ marginLeft: "34%" }}>Please select a pin</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleClick1}>Pin 1</button>
          <button onClick={handleClick2}>Pin 2</button>
          <button onClick={handleClick3}>Pin 3</button>
          <button onClick={handleClick4}>Pin 4</button>
          <button onClick={handleClick5}>Pin 5</button>
          <button onClick={handleClick6}>Pin 6</button>
        </div>
        <p style={{ marginTop: "20px" }}>Selected PIN : {pin}</p>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            style={{ marginTop: "10px" }}
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            style={{ marginTop: "10px" }}
            fullWidth
            id="smifi"
            name="smifi"
            label="Smifi"
            value={formik.values.smifi}
            onChange={formik.handleChange}
            error={formik.touched.smifi && Boolean(formik.errors.smifi)}
            helperText={formik.touched.smifi && formik.errors.smifi}
          />
          <TextField
            style={{ marginTop: "10px" }}
            fullWidth
            id="uid"
            name="uid"
            label="Uid"
            value={formik.values.userId}
            onChange={formik.handleChange}
            error={formik.touched.uid && Boolean(formik.errors.uid)}
            helperText={formik.touched.uid && formik.errors.uid}
          />
          {/* <Button
          style={{ marginTop: "10px" }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Add device
        </Button> */}
          <button
            type="submit"
            style={hover ? hoverStyle : normalStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            ADD DEVICE
          </button>
        </form>
        <hr style={{ marginTop: "20px" }} />
        <h1 style={{ marginLeft: "42.2%" }}>Rooms</h1>

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Sr.</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Pins</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pinState.pinsArray?.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.epvi001 + ""}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={handleOpen}>Edit Pin</Button>
                    {/* <Button onClick={handleOpen} style={{ marginLeft: "10px" }}>Add Pin</Button> */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Edit Pin
              </Typography>
              <form onSubmit={handleEditPin}>
              <TextField
            style={{ marginTop: "10px" }}
            type="number"
            fullWidth
            id="editpin"
            name="editpin"
            label="Pin"
            value={name}
            onChange={e => setName(e.target.value)}
            />
          <button style={{marginTop:"20px"}} type="submit">Submit</button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default SetupPin;
const userRole = "admin";
SetupPin.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};
