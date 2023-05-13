import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

//just like the function that smilga created to consume the context that we created , so is this useAuthContext hook

export const useAuthContext=()=>{
 const context= useContext(AuthContext)
if(!context){
  throw Error('useAuthContext must be inside an AuthContextProvider')
}
 return context
}
