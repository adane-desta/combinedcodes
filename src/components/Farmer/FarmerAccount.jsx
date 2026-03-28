import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../Common/PageHeader'
import styles from './FarmerAccount.module.css'

function FarmerAccount() {
  const { userData, setUserData } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData || {})

  const handleSave = () => {
    setUserData(formData)
    setIsEditing(false)
  }

  return (
    <>
      <PageHeader title="Account Settings" icon="fas fa-user-cog" />
      
      <div className={styles.container}>
        <div className={styles.settingSection}>
          <h2>Profile Information</h2>
          
          {!isEditing ? (
            <div className={styles.viewMode}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Full Name</label>
                  <p>{userData?.name}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Email</label>
                  <p>{userData?.email}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Phone</label>
                  <p>{userData?.phone}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Farm Name</label>
                  <p>{userData?.farmName}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Location</label>
                  <p>{userData?.location}</p>
                </div>
              </div>
              <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          ) : (
            <form className={styles.editForm} onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className={styles.formGrid}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Farm Name"
                  value={formData.farmName || ''}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default FarmerAccount
