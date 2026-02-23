import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../Common/PageHeader'
import Modal from '../Common/Modal'
import styles from './VetAppointments.module.css'

function VetAppointments() {
  const { appointments, updateAppointment, deleteAppointment } = useApp()
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [emailData, setEmailData] = useState({ to: '', subject: '', body: '' })

  const handleAccept = (appointment) => {
    setSelectedAppointment(appointment)
    setEmailData({
      to: appointment.email,
      subject: `Appointment Confirmation - ${appointment.farmerName}`,
      body: `Dear ${appointment.farmerName},\n\nYour appointment on ${new Date(appointment.date).toLocaleDateString()} has been confirmed.\n\nBest regards`
    })
    setShowEmailModal(true)
  }

  const handleReject = (id) => {
    if (window.confirm('Are you sure you want to reject this appointment?')) {
      deleteAppointment(id)
    }
  }

  const handleSendEmail = (e) => {
    e.preventDefault()
    if (selectedAppointment) {
      updateAppointment(selectedAppointment.id, { status: 'confirmed' })
      setShowEmailModal(false)
    }
  }

  return (
    <>
      <PageHeader title="Appointments" icon="fas fa-calendar-check" />
      
      <div className={styles.container}>
        <div className={styles.tableWrapper}>
          <table className={styles.appointmentsTable}>
            <thead>
              <tr>
                <th>Farmer Name</th>
                <th>Animal</th>
                <th>Date & Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(apt => (
                <tr key={apt.id}>
                  <td className={styles.farmerName}>{apt.farmerName}</td>
                  <td>{apt.animalName}</td>
                  <td>{new Date(apt.date).toLocaleDateString()} {apt.time}</td>
                  <td>{apt.reason}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    {apt.status === 'pending' && (
                      <>
                        <button
                          className={`${styles.btn} ${styles.accept}`}
                          onClick={() => handleAccept(apt)}
                          title="Accept"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button
                          className={`${styles.btn} ${styles.reject}`}
                          onClick={() => handleReject(apt.id)}
                          title="Reject"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <p className={styles.emptyMessage}>No appointments yet</p>
          )}
        </div>
      </div>

      <Modal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title="Send Confirmation"
      >
        <form onSubmit={handleSendEmail} className={styles.emailForm}>
          <div className={styles.formGroup}>
            <label>To:</label>
            <input
              type="email"
              value={emailData.to}
              onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label>Subject:</label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Message:</label>
            <textarea
              value={emailData.body}
              onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
              rows="5"
            />
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.btnSecondary} onClick={() => setShowEmailModal(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary}>
              Send & Confirm
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default VetAppointments
