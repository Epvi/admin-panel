import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../auth/AuthContext";

export function withProtected(Component) {
  return function WithProtected(props) {
    const { currentUser } = useAuth();
    const router = useRouter();
    if (!currentUser) {
      useEffect(() => {
        router.replace("/login");
      }, [currentUser]);
      return <h1>Loading...</h1>;
    }
    return <Component {...props} />;
  };
}
