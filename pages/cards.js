import * as React from "react";
import Box from "@mui/material/Box";
import Table from "../pages/tables"
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import {useState, useEffect} from 'react'
import { query, orderBy, onSnapshot} from "firebase/firestore"
import {database} from '../firebaseConfig'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
export default function SimpleContainer() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      await addDoc(collection(database, 'tasks'), {
        title: "EPVI Bills",
        description: "You have 15 days left to pay the bill",
        completed: false,
        created: Timestamp.now()
      })
      alert("Added Succesfully")
      // onClose()
    } catch (err) {
      alert(err)
    }
  }
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const q = query(collection(database, 'tasks'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    console.log(tasks)
  },[])
  const handleDelete = async () => {
    const taskDocRef = doc(database, 'tasks', 
    "6t2vl7NGH93elxmZaBvc")
    try{
      await deleteDoc(taskDocRef)
      alert("Deleted Succesfully");
    } catch (err) {
      alert(err)
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(database, 'tasks', 
    '6t2vl7NGH93elxmZaBvc')
    try{
      await updateDoc(taskDocRef, {
        title: "EPVI UPdated",
        description: "Bill Paid"
      })
      alert("Updated Succesfully");
      // onClose()
    } catch (err) {
      alert(err)
    }    
  }


  return (
      <>
      <Box sx={{ display:"flex",
      flexDirection:"row",
      width:"inherit",
      marginLeft:"20px"}}>
      <Box
        sx={{
          backgroundColor: "pink",
          height: "50vh",
          width: "50vw",
          marginTop: "24px",
          borderRadius: "25px",
          padding: "10px",
        }}
      ><form onSubmit={handleSubmit} className='addTask' name='addTask'>
      <button type="submit">Add Task</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
      </Box>
      <Box
        sx={{
          height: "50vh",
          width: "50vw",
          marginTop: "24px",
          padding: "10px",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box
            sx={{
              backgroundColor: "Pink",
              padding: "15px",
              width: "47%",
              height: "23vh",
              borderRadius: "25px",
            }}
          >
            Hello
          </Box>
          <Box
            sx={{
              backgroundColor: "Pink",
              padding: "15px",
              marginLeft: "30px",
              width: "47%",
              height: "23vh",
              borderRadius: "25px",
            }}
          >
            Hello
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "Pink",
              padding: "15px",
              width: "47%",
              height: "23vh",
              borderRadius: "25px",
            }}
          >
            Hello
          </Box>
          <Box
            sx={{
              backgroundColor: "Pink",
              padding: "15px",
              marginLeft: "30px",
              width: "47%",
              height: "23vh",
              borderRadius: "25px",
            }}
          >
            Hello
          </Box>
        </Box>
      </Box>
      </Box>
      <Table/>
    </>
  );
}
