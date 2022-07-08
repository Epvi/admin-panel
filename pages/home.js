import React from "react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const home = () => {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!currentUser) Router.push("/");
    setLoading(false);
  }, []);
  if (loading) return <p>Loading...</p>;

  return <>{/* { currentUser && <Navbar userRole={userRole}/>} */}</>;
};

export default home;
