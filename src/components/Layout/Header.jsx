import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import styles from './Header.module.css'

function Header({ onMenuToggle, user, role }) {
  const navigate = useNavigate()
  const { notifications } = useApp()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/')
    }
  }

  const totalNotifications = Object.values(notifications).reduce((a, b) => a + b, 0)
  const logoText = role === 'veterinarian' ? 'VetCare' : 'FarmCare'

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <button className={styles.menuToggle} onClick={onMenuToggle}>
          <i className="fas fa-bars"></i>
        </button>

        <div className={styles.logo}>
          {logoText}
          <span>Dashboard</span>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.notificationIcon}>
            <i className="fas fa-bell"></i>
            {totalNotifications > 0 && (
              <span className={styles.notificationCount}>{totalNotifications}</span>
            )}
          </div>

          <div className={styles.userProfile}>
            <span className={styles.userName}>{user?.name || 'User'}</span>
            <div className={styles.avatar}>
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          </div>

          <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
