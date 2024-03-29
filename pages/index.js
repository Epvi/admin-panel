import React, { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { app, database } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Layout from "../components/Layout";
import { useAuth } from "../auth/AuthContext";
import DashboardData from "./cards";
import { withProtected } from "../src/hooks/routes";

const Index = () => {
  // console.log("Index called");
  const { currentUser } = useAuth();
  const [usersArray, setUsersArray] = useState([]);
  const dbInstance = collection(database, "Users");

  const getUsers = () => {
    getDocs(dbInstance)
      .then((data) => {
        setUsersArray(
          data.docs.map((item) => {
            // console.log({ ...item.data(), id: item.id});
            return { ...item.data(), id: item.id };
          })
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!currentUser) {
      console.log("No user!");
      // Router.push("/login");
      // setLoading(false);
    } else {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout userRole={"admin"}>
      <Head>
        <title>EPVI - Managing Electricity wisely</title>
      </Head>
    </Layout>
  );
};
// Index.getLayout = function getLayout(page) {
//   // const { currentUser } = useAuth();
//   return (
//     <Layout userRole={userRole}>
//       <DashboardData />
//     </Layout>
//   );
// };

export default withProtected(Index);
