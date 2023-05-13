//so this hook will be used to add or remove document
import { db } from "../firebase/config";
import { addDoc,  doc } from "firebase/firestore";
import { collection } from 'firebase/firestore'
import { useReducer, useState, useEffect } from "react";
import { timestamp } from "../firebase/config";
import { deleteDoc } from "firebase/firestore";

//firebase details
//the initialState to be added to our useReducer hook
//notice we are using let which allows us to match the initialstate to another value later



let initialState={
 document:null,
 isPending:false,
 error:null,
 success:null
}

//be careful to not name function with functions we imported from firestore, else we get error

const firestoreReducer=(state, action)=>{

  switch (action.type){
    case 'IS_PENDING':
      return {
        isPending: true, 
        document:null, 
        success:false, 
        error:null 
      }

    case 'ADDED_DOCUMENT':
      return {
        ...state,
        isPending: false, 
        document: action.payload,
        success: true,
        error: null,
      }
    case 'DELETED_DOC':
      return {
        error: null,
        isPending: false,
        document: action.payload,
        success: true,
      }
     case 'ERROR':
        return {
         isPending:'false', 
         document:null, 
         success:false,
         error:action.payload
        } 
    default:
      return state 
  }
} 



export const useFireStore=(col)=>{
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setisCancelled] = useState(false)

  //collection ref

  const ref = collection (db, col)


  //the below is a parameter and only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      // the logic here is that if !isCancelled then we pass in { type: 'ADDED_DOCUMENT', payload: addeddocument } which will in turn hit the dispatch that is below, meaning that we are still passing an object into the dispatch but at the same time checking for another thing
      dispatch(action)
    }
  }

  //add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })
    //instead of setting the different states manually when we want to perform the async task, we make use of the reducer function and then we just dispatch stuffs

    try {
      const addeddocument = await addDoc(ref, {...doc, created_at:timestamp.now()})
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addeddocument })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  //delete a doc
  const deleteDocument = async (id) => {
    try{
       await deleteDoc (doc(ref, id))
      //  dispatch({ type: 'DELETED_DOC', payload: deletee})

    }catch(err){
      dispatch({type:'ERROR', payload:'could not delete'})
        console.log(err)
    }
  }

  useEffect(() => {
    return () => {
      setisCancelled(true)
    }
  }, [])

  return { addDocument, deleteDocument, response }
}