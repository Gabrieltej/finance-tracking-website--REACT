import React from 'react'
//styles
import styles from './Home.module.css'
import { useFireStore } from '../../hoooks/useFirestore'

export default function TransactionList({transactions}) {

  const { deleteDocument, response } = useFireStore('transactions')
  console.log(response)
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className='styles.amount'>${transaction.amount}</p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}
