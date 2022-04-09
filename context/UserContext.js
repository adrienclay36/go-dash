import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
export const UserContext = createContext({
  user: {},
  location: {},
});
const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState({ city: "San Francisco" });

  const getUser = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser?.email);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
        setLocation(docSnap.data().location[0]);

      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("USER CONTEXT:: ", err.message);
    }
  };

  useEffect(() => {
    if (auth?.currentUser) {
      getUser();
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, location }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
