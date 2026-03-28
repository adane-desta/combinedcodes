import React from 'react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../Common/PageHeader'
import styles from './FarmerAppointments.module.css'

function FarmerAppointments() {
  const { appointments, deleteAppointment } = useApp()

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      deleteAppointment(id)
    }
  }

  return (
    <>
      <PageHeader title="My Appointments" icon="fas fa-calendar-plus" />
      
      <div className={styles.container}>
        <div className={styles.appointmentsGrid}>
          {appointments.map(apt => (
            <div key={apt.id} className={styles.appointmentCard}>
              <div className={styles.cardHeader}>
                <h3>{apt.vetName}</h3>
                <span className={`${styles.badge} ${styles[apt.status]}`}>
                  {apt.status}
                </span>
              </div>
              <div className={styles.details}>
                <p><strong>Animal:</strong> {apt.animalName}</p>
                <p><strong>Date:</strong> {new Date(apt.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {apt.time}</p>
                <p><strong>Reason:</strong> {apt.reason}</p>
                <p><strong>Location:</strong> {apt.type}</p>
              </div>
              {apt.status !== 'cancelled' && (
                <button
                  className={styles.cancelBtn}
                  onClick={() => handleCancel(apt.id)}
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <p className={styles.emptyMessage}>No appointments booked yet</p>
        )}
      </div>
    </>
  )
}

export default FarmerAppointments
