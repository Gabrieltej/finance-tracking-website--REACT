//from our module
import styles from './Navbar.module.css'
import { useAuthContext } from '../hoooks/useAuthContext'
import { FaMoneyBillAlt } from 'react-icons/fa'


//from react router
import { Link, Outlet } from 'react-router-dom'
import { useLogout } from '../hoooks/useLogout'  //import the hook
import React from 'react'

export default function Navbar(){
  // destructure the function that you want from the hook
  const {logout}=useLogout()
  const{user}=useAuthContext() //user is coming from the state that we spread inside of our value in the context
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li className={styles.title}>
            <Link to='/'>
              my<span style={{ color: 'white' }}>Money</span>{' '}
              <span>
                <FaMoneyBillAlt />
              </span>
            </Link>
          </li>

          {!user && (
            <>
              <li>
                <Link
                  to='/login'
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to='/signup'
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}

          {user && (
            <>
              {/* user.displayName will work on the navbar as opposed when we were saying res.user.displayName */}
              <p>hello, {user.displayName}</p>
              <li>
                <button className='btn' onClick={logout} style={{color:'white'}}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

 