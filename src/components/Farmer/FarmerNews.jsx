import React from 'react'
import PageHeader from '../Common/PageHeader'
import styles from './FarmerNews.module.css'

function FarmerNews() {
  return (
    <>
      <PageHeader title="News & Events" icon="fas fa-newspaper" />
      <div className={styles.container}>
        <p className={styles.message}>News and events section - Coming soon</p>
      </div>
    </>
  )
}

export default FarmerNews
