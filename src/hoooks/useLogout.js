import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"

export const  useLogout=()=>{
 //so basically anything that will take some times to do, like asynchronous, make sure that you set the error and the ispending state, now this logout is an async function that will take some times to do
 const[error, setError]=useState(null)
 const[isPending, setisPending]=useState(true)
 const{dispatch}=useAuthContext()

 const logout=async()=>{
   setError(null) 
   setisPending(true)
   //signing the user out
   try{
    await signOut(auth)
    dispatch({type:'LOGOUT'}) //we do not need to pass a payload here since when we are signed out, the user value will return back to null which was the value for the initial state
    setisPending(false)
    setError(null)
   } catch(err){
     console.log(err.message)
      setError(err.message)
      setisPending(false)
   }
 }
 return {logout, error, isPending}
} 