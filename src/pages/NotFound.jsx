import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>The page you're looking for doesn't exist.</p>
        <button className={styles.button} onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Go Back
        </button>
      </div>
    </div>
  )
}

export default NotFound
