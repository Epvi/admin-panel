import React, {useState, useEffect} from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Login from './login';
import Layout from '../components/Layout';
import { useAuth } from '../auth/AuthContext';


const Index = () => {
  const { currentUser } = useAuth()
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
    if (!currentUser) {
      Router.push('/login')
      // setLoading(false);
    } else {
      getUsers();
    }

  }, [])
  
  return (
    <>
    <Head>
      <title>EPVI - Managing Electricity wisely</title>
    </Head>
    </>
  )
}
const userRole = "admin";

Index.getLayout = function getLayout(page) {
  return (
    <Layout userRole={userRole}>
      {page}
    </Layout>
  )
}

export default Index


    // "dashify": "^2.0.0",
    // "styled-components": "^5.3.5",
