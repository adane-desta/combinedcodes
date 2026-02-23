import React from 'react'
import PageHeader from '../Common/PageHeader'
import styles from './VetResources.module.css'

function VetResources() {
  return (
    <>
      <PageHeader title="Resources" icon="fas fa-book-medical" />
      <div className={styles.container}>
        <p className={styles.message}>Resources section - Coming soon</p>
      </div>
    </>
  )
}

export default VetResources
