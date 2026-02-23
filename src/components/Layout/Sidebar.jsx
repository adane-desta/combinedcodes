import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import styles from './Sidebar.module.css'

function Sidebar({ role, isOpen, onClose, user }) {
  const location = useLocation()
  const { notifications } = useApp()

  const isActive = (path) => {
    return location.pathname.includes(path)
  }

  const navItems = role === 'veterinarian' ? [
    { label: 'Overview', path: '', icon: 'fa-calendar-check' },
    { label: 'Appointments', path: 'appointments', icon: 'fa-calendar-check', badge: notifications.appointments },
    { label: 'Questions', path: 'questions', icon: 'fa-question-circle', badge: notifications.questions },
    { label: 'News & Events', path: 'news', icon: 'fa-newspaper' },
    { label: 'Resources', path: 'resources', icon: 'fa-book-medical' },
    { label: 'Account', path: 'account', icon: 'fa-user-cog' }
  ] : [
    { label: 'Dashboard', path: '', icon: 'fa-tachometer-alt' },
    { label: 'My Animals', path: 'animals', icon: 'fa-tractor' },
    { label: 'Appointments', path: 'appointments', icon: 'fa-calendar-plus' },
    { label: 'My Questions', path: 'questions', icon: 'fa-question-circle', badge: notifications.questions },
    { label: 'News & Events', path: 'news', icon: 'fa-newspaper' },
    { label: 'Market Prices', path: 'market', icon: 'fa-chart-line' },
    { label: 'Account', path: 'account', icon: 'fa-user-cog' }
  ]

  const basePath = `/dashboard/${role}`

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      
      <aside className={`${styles.sidebar} ${isOpen ? styles.active : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.userInfo}>
            <div className={styles.avatarLarge}>
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className={styles.userDetails}>
              <h2>{user?.name || 'User'}</h2>
              <p className={styles.userRole}>
                {role === 'veterinarian' ? 'Veterinarian' : 'Farm Owner'}
              </p>
            </div>
          </div>
          <button className={styles.closeMenu} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path ? `${basePath}/${item.path}` : basePath}
              className={`${styles.navItem} ${isActive(item.path || basePath) ? styles.active : ''}`}
              onClick={onClose}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className={styles.notificationBadge}>{item.badge}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.statsCard}>
            <h4>Today's Stats</h4>
            <div className={styles.statsGrid}>
              {role === 'veterinarian' ? (
                <>
                  <div className={styles.statItem}>
                    <i className="fas fa-clock"></i>
                    <div>
                      <p className={styles.statNumber}>{notifications.appointments || 0}</p>
                      <p className={styles.statLabel}>Appointments</p>
                    </div>
                  </div>
                  <div className={styles.statItem}>
                    <i className="fas fa-comments"></i>
                    <div>
                      <p className={styles.statNumber}>{notifications.questions || 0}</p>
                      <p className={styles.statLabel}>Questions</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.statItem}>
                    <i className="fas fa-calendar-check"></i>
                    <div>
                      <p className={styles.statNumber}>2</p>
                      <p className={styles.statLabel}>Appointments</p>
                    </div>
                  </div>
                  <div className={styles.statItem}>
                    <i className="fas fa-cow"></i>
                    <div>
                      <p className={styles.statNumber}>24</p>
                      <p className={styles.statLabel}>Animals</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
