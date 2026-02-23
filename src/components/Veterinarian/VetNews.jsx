import React from 'react'
import PageHeader from '../Common/PageHeader'
import styles from './VetNews.module.css'

function VetNews() {
  return (
    <>
      <PageHeader title="News & Events" icon="fas fa-newspaper" />
      <div className={styles.container}>
        <p className={styles.message}>News and events section - Coming soon</p>
      </div>
    </>
  )
}

export default VetNews
