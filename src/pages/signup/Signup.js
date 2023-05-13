import styles from './Signup.module.css'
import React from 'react'
import { useState } from 'react'
import { useSignup } from '../../hoooks/usesignup'


export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const {signUp, error, isPending}=useSignup()



//execute the function below when we submit
    const handleSubmit = (e) => {
      e.preventDefault()
      if (email.length === 0 || password.length === 0) {
        alert('input field can not be empty')
      } else {
        // console.log(email, password, displayName)
        signUp(email, password, displayName)  //same order as it is in the hook that we created
        setEmail('')
        setPassword('')
        setDisplayName('')
      }

    }

  
  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>

      {/* for the email field */}

      <label>
        <span>email:</span>
        <input
          value={email}
          type='email'
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </label>

      {/* for the password field */}
      <label>
        <span>password:</span>
        <input
          value={password}
          type='password'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </label>
      {/* for the display field */}

      <label>
        <span>Display Name:</span>
        <input
          value={displayName}
          type='text'       
          onChange={(e) => {
            setDisplayName(e.target.value)
          }}
        />
      </label>

      {!isPending &&<button className='btn'>Sign Up</button>}
      {isPending && 
        <button className='btn' disabled>
          loading
        </button>
      }
      {error && <p>{error}</p>}
    </form>
  )
}
