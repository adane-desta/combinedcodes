import React from 'react'
import styles from './StatCard.module.css'

function StatCard({ icon, title, label, type = 'primary' }) {
  return (
    <div className={`${styles.statCard} ${styles[`stat${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}>
      <div className={styles.iconContainer}>
        <i className={icon}></i>
      </div>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  )
}

export default StatCard
