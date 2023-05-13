import React from 'react'
import { useAuthContext } from '../../hoooks/useAuthContext'

//styles
import styles from './Home.module.css'
import TransactionList from './TransactionList'
import Transactionform from './Transactionform'
import { useCollection } from '../../hoooks/useCollection'

export default function Home() {

  const{user}= useAuthContext()
  const{documents, error}=useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['created_at', 'desc']
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents}/>}
      </div>
      <div className={styles.sidebar}>
        {/* uid is the user id and it is unique */}
        <Transactionform  uid={user.uid}/>
      </div>
    </div>
  )
}
