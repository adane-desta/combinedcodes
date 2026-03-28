import React from 'react'
import styles from './PageHeader.module.css'

function PageHeader({ title, icon, action, onAction }) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className={styles.contentHeader}>
      <div className={styles.titleSection}>
        {icon && <i className={`${icon} ${styles.icon}`}></i>}
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>
      <div className={styles.headerActions}>
        {action && (
          <button className={styles.actionBtn} onClick={onAction}>
            {action}
          </button>
        )}
        <div className={styles.dateDisplay}>
          <i className="fas fa-calendar-day"></i>
          <span>{today}</span>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
