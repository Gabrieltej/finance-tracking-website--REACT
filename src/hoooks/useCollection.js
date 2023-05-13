import { db } from '../firebase/config'
import { useState, useEffect, useRef } from 'react'
import {
  query,
  where,
  collection,
  onSnapshot
} from 'firebase/firestore'


export const useCollection = (col, _query) => {
  //null means that they will have a value later
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // query and orderBy arguments in the us eCollection hook
  const q = useRef(_query).current

  useEffect(() => {
    //the collection reference
    let colRef = collection(db, col)

      if (q) {
        colRef = query(colRef, where(...q))
      }

      // check for a orderBy argument
      // if (orderBy) {
      //   colRef = query(colRef, orderBy(...order))
      // }

    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })

        setDocuments(results)
        setError(null)
      },
      (error) => {
        console.log(error)
        setError('could not fetch the data')
      }
    )

    return () => {
      unsub()
    }
  }, [col, q])

  return {documents, error}
}
