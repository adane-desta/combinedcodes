import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import StatCard from '../Common/StatCard'
import styles from './FarmerDashboard.module.css'

function FarmerDashboard() {
  const { animals, appointments, questions, userData } = useApp()

  const upcomingAppointments = appointments.filter(a => new Date(a.date) > new Date())
  const pendingQuestions = questions.filter(q => q.status === 'pending').length
  const unhealthyAnimals = animals.filter(a => a.healthStatus !== 'healthy').length

  return (
    <div className={styles.dashboardOverview}>
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeContent}>
          <h2>Welcome back, {userData?.name || 'Farmer'}!</h2>
          <p>
            You have <strong>{upcomingAppointments.length}</strong> upcoming appointments and{' '}
            <strong>{pendingQuestions}</strong> unanswered questions.
          </p>
          <div className={styles.weatherInfo}>
            <i className="fas fa-sun"></i>
            <span>Sunny, 24°C - Good weather for farm work</span>
          </div>
        </div>
        <div className={styles.welcomeIllustration}>
          <i className="fas fa-tractor"></i>
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
          title={unhealthyAnimals}
          label="Health Alerts"
          type="warning"
        />
        <StatCard
          icon="fas fa-cow"
          title={animals.length}
          label="Total Animals"
          type="info"
        />
      </div>

      <div className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <Link to="appointments" className={styles.actionCard}>
            <i className="fas fa-calendar-plus"></i>
            <span>Book Appointment</span>
          </Link>
          <Link to="questions" className={styles.actionCard}>
            <i className="fas fa-question-circle"></i>
            <span>Ask Question</span>
          </Link>
          <Link to="animals" className={styles.actionCard}>
            <i className="fas fa-plus-circle"></i>
            <span>Add Animal</span>
          </Link>
          <Link to="market" className={styles.actionCard}>
            <i className="fas fa-chart-line"></i>
            <span>Market Prices</span>
          </Link>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Upcoming Appointments</h3>
            <Link to="appointments" className={styles.viewLink}>View All</Link>
          </div>
          <div className={styles.itemsList}>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.slice(0, 3).map(apt => (
                <div key={apt.id} className={styles.appointmentItem}>
                  <div className={styles.itemInfo}>
                    <h4>{apt.vetName}</h4>
                    <p>{apt.animalName} - {apt.reason}</p>
                    <small>{new Date(apt.date).toLocaleDateString()} at {apt.time}</small>
                  </div>
                  <span className={`${styles.badge} ${styles[apt.status]}`}>{apt.status}</span>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>No upcoming appointments</p>
            )}
          </div>
        </div>

        <div className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Your Animals</h3>
            <Link to="animals" className={styles.viewLink}>View All</Link>
          </div>
          <div className={styles.animalsList}>
            {animals.length > 0 ? (
              animals.slice(0, 3).map(animal => (
                <div key={animal.id} className={styles.animalItem}>
                  <div className={styles.animalInfo}>
                    <h4>{animal.name}</h4>
                    <p>{animal.breed} - {animal.type}</p>
                  </div>
                  <span className={`${styles.healthBadge} ${styles[animal.healthStatus]}`}>
                    {animal.healthStatus}
                  </span>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>No animals yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmerDashboard
