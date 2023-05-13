import { useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { updateProfile } from 'firebase/auth'
//we're creating a hook that we want to execute whenever ve we using this custom hook
 

export const useSignup = () => {
  const [error, setError] = useState(null) 
  const [isPending, setIspending] = useState(false)
  const{dispatch}=useAuthContext()

  //recall that we already pass the dispatch as a value already
  

  //the function below is the function that we would like to run whenever we submit

  const signUp = async (email, password, displayName) => {
    setError(null) //null--meaning that we do not have a value for the error yet and then we can have a value later
    setIspending(true)

    try {
      //sign up the user
      const res =await createUserWithEmailAndPassword (auth, email, password)
      // console.log(res) 
      // console.log(res.user)
      if (!res) {
        throw new Error('could not complete signup')
  
      }
      //add display name to user
      await updateProfile(res.user, {displayName: displayName})

      //dispatch login action
      dispatch({type:'LOGIN', payload:res.user})

      //recall that payload is a key in your action which stores the data you want to  pass to the reducers. 
   setIspending(false)
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError(err.message)
      setIspending(false)
    }
  }
  return { error, isPending, signUp }
}
