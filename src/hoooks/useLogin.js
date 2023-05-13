import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'


export const useLogin = () => {
  //so basically anything that will take some times to do, like asynchronous, make sure that you set the error and the ispending state, now this logout is an async function that will take some times to do
  const[isCancelled, setisCancelled]=useState(false)
  const [error, setError] = useState(null)
  const [isPending, setisPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email,password) => {
    setError(null)
    setisPending(true)
    //signing the user out
    try {
      const res=await signInWithEmailAndPassword(auth, email,password)

      dispatch({ type: 'LOGIN', payload: res.user }) //we do not need to pass a payload here since when we are signed out, the user value will return back to null which was the value for the initial state
      if(isCancelled){
       setisPending(false)
       setError(null)
      }

    } catch (err) {
      console.log(err.message)
      setError(err.message)
      setisPending(false)
    }
  }
  return { login, error, isPending }
}
