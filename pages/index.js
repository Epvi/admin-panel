import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Login from './login'
const index = () => {
  const [usersArray, setUsersArray] = useState([]);
  const dbInstance = collection(database, 'Users');
  
  const getUsers = () => {
    getDocs(dbInstance)
        .then((data) => {
            setUsersArray(data.docs.map((item) => {
              // console.log({ ...item.data(), id: item.id});
              return { ...item.data(), id: item.id};
            }));
        })
        .catch(err => console.log(err));
  }
  
  useEffect(() => {
    getUsers();
  }, [])
  
  return (
    <>
    <Head>
      <title>EPVI - Managing Electricity wisely</title>
    </Head>
    <Login/>
    </>
  )
}

export default index 
