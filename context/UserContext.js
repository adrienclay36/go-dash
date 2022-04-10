import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
export const UserContext = createContext({
  user: {},
  locations: {},
  favorites: [],
  orders: [],
});

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [orders, setOrders] = useState([]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if(auth.currentUser) {
    const userRef = doc(db, "users", auth.currentUser?.email);
    const unsub = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedFavorites = snapshot.data().favorites;
        setFavorites(fetchedFavorites);
        setUser(snapshot.data());
        setLocations(snapshot.data().location);
        setOrders(snapshot.data().orders);
        
      }
    });
    return () => unsub();
  }

  }, [auth.currentUser]);





  return (
    <UserContext.Provider value={{ user, locations, favorites, orders }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
