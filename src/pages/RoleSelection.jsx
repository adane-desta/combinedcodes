import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './RoleSelection.module.css'

function RoleSelection() {
  const navigate = useNavigate()
  const { setUserRole } = useApp()

  const handleSelectRole = (role) => {
    setUserRole(role)
    navigate(`/dashboard/${role}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
        <div className={styles.header}>
          <h1 className={styles.title}>Choose Your Role</h1>
          <p className={styles.subtitle}>Connect veterinarians with farmers for better animal care</p>
        </div>

        <div className={styles.rolesGrid}>
          <button
            className={styles.roleCard}
            onClick={() => handleSelectRole('veterinarian')}
          >
            <div className={styles.iconContainer}>
              <i className="fas fa-stethoscope"></i>
            </div>
            <h2>Veterinarian</h2>
            <p>Manage appointments, answer questions, and provide medical guidance</p>
            <div className={styles.features}>
              <span><i className="fas fa-check"></i> Appointment Management</span>
              <span><i className="fas fa-check"></i> Question Responses</span>
              <span><i className="fas fa-check"></i> Resource Sharing</span>
            </div>
          </button>

          <button
            className={styles.roleCard}
            onClick={() => handleSelectRole('farmer')}
          >
            <div className={styles.iconContainer}>
              <i className="fas fa-tractor"></i>
            </div>
            <h2>Farmer</h2>
            <p>Book appointments, manage animals, and get veterinary advice</p>
            <div className={styles.features}>
              <span><i className="fas fa-check"></i> Animal Management</span>
              <span><i className="fas fa-check"></i> Appointment Booking</span>
              <span><i className="fas fa-check"></i> Market Prices</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
