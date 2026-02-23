import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../Common/PageHeader'
import Modal from '../Common/Modal'
import styles from './FarmerAnimals.module.css'

function FarmerAnimals() {
  const { animals, addAnimal, updateAnimal, deleteAnimal } = useApp()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    gender: 'female',
    weight: '',
    tag: ''
  })

  const handleAddAnimal = (e) => {
    e.preventDefault()
    addAnimal({ ...formData, healthStatus: 'healthy' })
    setFormData({
      name: '',
      type: '',
      breed: '',
      age: '',
      gender: 'female',
      weight: '',
      tag: ''
    })
    setShowModal(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this animal?')) {
      deleteAnimal(id)
    }
  }

  return (
    <>
      <PageHeader 
        title="My Animals" 
        icon="fas fa-tractor"
        action="Add Animal"
        onAction={() => setShowModal(true)}
      />
      
      <div className={styles.container}>
        <div className={styles.animalsGrid}>
          {animals.map(animal => (
            <div key={animal.id} className={styles.animalCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.animalName}>{animal.name}</h3>
                <span className={`${styles.healthBadge} ${styles[animal.healthStatus]}`}>
                  {animal.healthStatus}
                </span>
              </div>

              <div className={styles.animalDetails}>
                <div className={styles.detail}>
                  <span className={styles.label}>Type</span>
                  <p>{animal.type}</p>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Breed</span>
                  <p>{animal.breed}</p>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Age</span>
                  <p>{animal.age} years</p>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Weight</span>
                  <p>{animal.weight} kg</p>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Tag</span>
                  <p>{animal.tag}</p>
                </div>
              </div>

              <div className={styles.cardActions}>
                <button 
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(animal.id)}
                  title="Delete"
                >
                  <i className="fas fa-trash"></i> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {animals.length === 0 && (
          <p className={styles.emptyMessage}>No animals added yet. Click "Add Animal" to get started.</p>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Animal"
      >
        <form onSubmit={handleAddAnimal} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Animal Name *</label>
            <input
              type="text"
              required
              placeholder="e.g., Daisy"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Type *</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">Select type</option>
                <option value="cow">Cow</option>
                <option value="bull">Bull</option>
                <option value="goat">Goat</option>
                <option value="chicken">Chicken</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Breed *</label>
              <input
                type="text"
                required
                placeholder="e.g., Holstein"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Age (years)</label>
              <input
                type="number"
                placeholder="0"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="0"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tag/ID</label>
            <input
              type="text"
              placeholder="e.g., Farm-001"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Add Animal
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default FarmerAnimals
