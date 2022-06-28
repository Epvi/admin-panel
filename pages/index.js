import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const user = "admin";
const Login = dynamic(() => import('../pages/login'), {
  suspense: true,
})
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
    <h2 style={{textAlign:"center",margin:"30px 0"}}>Welcome to EPVI</h2>
    <Login/>
    </>
  )
}

export default index 
