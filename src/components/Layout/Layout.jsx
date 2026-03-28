import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import Sidebar from './Sidebar'
import Header from './Header'
import styles from './Layout.module.css'

function Layout({ children, role }) {
  const { userData } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        user={userData}
      />
      <div className={styles.mainWrapper}>
        <Header
          onMenuToggle={toggleSidebar}
          user={userData}
          role={role}
        />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
