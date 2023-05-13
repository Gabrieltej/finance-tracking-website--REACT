import styles from './Login.module.css'
import { useLogin } from '../../hoooks/useLogin'
import React from 'react'
import { useState } from 'react'



export default function Login() {
const[email, setEmail]=useState('')
const[password, setPassword]=useState('')
const[displayName, setDisplayname]=useState('')
const{login, error, isPending}=useLogin()


  const handleSubmit=(e)=>{
      e.preventDefault()
      login(email, password)
      
  }


  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Log in</h2>

      {/* for the email field */}

      <label >
        <span>email:</span>
        <input value={email} type="email" onChange={(e)=>{
          setEmail(e.target.value)
        }} />
      </label>

    {/* for the password field */}
      <label >
        <span>password:</span>
        <input value={password} type="password" onChange={(e)=>{
          setPassword(e.target.value)
        }}/>
      </label> 
 
      {!isPending && <button className='btn'>LogIn</button>}
      {isPending && <button className='btn' disabled>loading</button>  }
      {error && <p>{error}</p> }
    </form>
  )
}
