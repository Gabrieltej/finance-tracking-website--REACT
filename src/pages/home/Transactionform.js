import React, { useEffect, useState } from 'react'
import { useFireStore } from '../../hoooks/useFirestore'



export default function Transactionform({uid}) {
 const[name, setName]=useState("")
 const[amount, setAmount]=useState("")
 const{addDocument, response}=useFireStore('transactions')
 
 const handleSubmit=(e)=>{
   e.preventDefault()
   addDocument({ 
    //we can get access to the currently logged in user by using the user.uid from our user, uid is the id of the user tha is currently logged in
      uid: uid,
      name,
      amount
     })

 }

 //depending on the status of the sucess object, we want to clear the input field, and do that anytime there is a change in the resonse.success object that we selected, though we can do the command to clear the input inside of the handleSubmit function, but we will not be able to check fro the success property, so going with the method below is the best
   useEffect(() => {
     if (response.success ) {
       setAmount('')
       setName('')
     }
   }, [response.success])


  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        {/* first input field */}
        <label>
          <span>Transaction name:</span>
          <input
            type='text'
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </label>
        {/* second input field */}
        <label>
          <span>Amount ($):</span>
          <input
            type='number'
            value={amount}
            required
            onChange={(e) => {
              setAmount(e.target.value)
            }}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  )
}
