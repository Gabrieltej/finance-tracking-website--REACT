import { Children, createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import React from 'react'
import { auth } from "../firebase/config";

//creating the context
export const AuthContext=createContext()
// the reducer function
export function authReducer(state, action){

  switch(action.type) {
    case 'LOGIN':
      return{...state, user: action.payload}
    case 'AUTH_IS_READY':
      return ({...state, user:action.payload, authIsReady: true})
      case 'LOGOUT':
        return {...state, user:null}      
   default:
      return state
  }
}

// normal react functional  component command
export const AuthContextProvider=({children})=>{

 const[state, dispatch]=useReducer(authReducer, {
  user:null,
  authIsReady:false
})

useEffect(()=>{
  //this function is going to perfrom anytime there is some form of authentication state change, whether a user logs in or out or we refresh the page

const unsub = onAuthStateChanged(auth, (user) => {
    dispatch({ type: 'AUTH_IS_READY', payload: user})
  })
  // Cleanup subscription on unmount
  return() => {
    unsub()
  }
}, [])
 
 //console.log the state initially will be null but when we dispatch something the user will be updated
 console.log(state)
 //by using the spread operator to spread what is inside of the state, it means we can desttructure the user from it since this is what forms the initial state
  return (<AuthContext.Provider value={{...state, dispatch}}>
  {children}
 </AuthContext.Provider>)
 
}

