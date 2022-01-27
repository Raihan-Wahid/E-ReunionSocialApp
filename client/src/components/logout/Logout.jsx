import React, {useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const url = process.env.REACT_APP_API_URL;

function Logout() {
    const [loggedOut, setLoggedOut]=useState(false);
    const [updatedState, setUpdatedState]=useState(false);
  
    const { user: currentUser }=useContext(AuthContext);
  
    useEffect(() => {
        if (!loggedOut) {
            axios.get(`${url}/api/logout`, { withCredentials: true })
                .then((res) => {
                    setLoggedOut(true);
                })
                .catch((err) => {
                    // It's hard for this route to fail, but a connection error would probably logout the user anyway
                    setLoggedOut(true);
                })
    
        } else {
            currentUser.then(() => {
                setUpdatedState(true);
            })
                .catch((err) => {
                    // It's hard for verifyAuth' route to fail, but a connection error would probably logout the user anyway
                    setUpdatedState(true);
                })
        
        }
    },[loggedOut, currentUser]);
    
  if (loggedOut) {
    return <Redirect to="/login" />
  } else {
    return 'Logging out...';
  }
}

export default Logout;