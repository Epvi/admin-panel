import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
const AuthContext = React.createContext();
function useAuth() {
  return useContext(AuthContext);
}
function AuthProvider({ children, mode }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function logout() {
    return auth.signOut();
    // .then(res => {
    //     clearOrganization(dispatch.orgDispatch)
    //     clearUser(dispatch.userDispatch)
    // })
  }
  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    setCurrentUser,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* {children} */}
    </AuthContext.Provider>
  );
}
export { useAuth, AuthProvider };
