import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import StatCard from '../Common/StatCard'
import styles from './VeterinarianDashboard.module.css'

function VeterinarianDashboard() {
  const { appointments, questions, userData } = useApp()

  const todayAppointments = appointments.length
  const pendingQuestions = questions.filter(q => q.status === 'pending').length

  return (
    <div className={styles.dashboardOverview}>
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeContent}>
          <h2>Welcome back, {userData?.name || 'Doctor'}</h2>
          <p>
            You have <strong>{todayAppointments}</strong> appointments and{' '}
            <strong>{pendingQuestions}</strong> unanswered questions today.
          </p>
        </div>
        <div className={styles.welcomeIllustration}>
          <i className="fas fa-stethoscope"></i>
        </div>
      </div>

      <div className={styles.quickStats}>
        <StatCard
          icon="fas fa-calendar-alt"
          title={appointments.length}
          label="Monthly Appointments"
          type="primary"
        />
        <StatCard
          icon="fas fa-check-circle"
          title={questions.filter(q => q.status === 'answered').length}
          label="Answered Questions"
          type="success"
        />
        <StatCard
          icon="fas fa-exclamation-circle"
          title="3"
          label="Pending Cases"
          type="warning"
        />
        <StatCard
          icon="fas fa-users"
          title="42"
          label="Active Farmers"
          type="info"
        />
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Recent Appointments</h3>
            <Link to="appointments" className={styles.viewLink}>View All</Link>
          </div>
          <div className={styles.itemsList}>
            {appointments.length > 0 ? (
              appointments.slice(0, 3).map(apt => (
                <div key={apt.id} className={styles.appointmentItem}>
                  <div className={styles.itemInfo}>
                    <h4>{apt.farmerName}</h4>
                    <p>{apt.animalName} - {apt.reason}</p>
                    <small>{new Date(apt.date).toLocaleDateString()} at {apt.time}</small>
                  </div>
                  <span className={`${styles.badge} ${styles[apt.status]}`}>{apt.status}</span>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>No appointments</p>
            )}
          </div>
        </div>

        <div className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Pending Questions</h3>
            <Link to="questions" className={styles.viewLink}>View All</Link>
          </div>
          <div className={styles.itemsList}>
            {questions.filter(q => q.status === 'pending').length > 0 ? (
              questions.filter(q => q.status === 'pending').slice(0, 3).map(q => (
                <div key={q.id} className={styles.questionItem}>
                  <div className={styles.itemInfo}>
                    <h4>{q.farmerName}</h4>
                    <p>{q.question}</p>
                    <small>{new Date(q.date).toLocaleDateString()}</small>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>No pending questions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VeterinarianDashboard
