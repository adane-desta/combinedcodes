import React from 'react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../Common/PageHeader'
import styles from './FarmerQuestions.module.css'

function FarmerQuestions() {
  const { questions } = useApp()

  return (
    <>
      <PageHeader title="My Questions" icon="fas fa-question-circle" />
      
      <div className={styles.container}>
        <div className={styles.questionsGrid}>
          {questions.map(q => (
            <div key={q.id} className={styles.questionCard}>
              <div className={styles.cardHeader}>
                <h3>{q.subject}</h3>
                <span className={`${styles.badge} ${styles[q.status]}`}>
                  {q.status}
                </span>
              </div>
              <p className={styles.category}>Category: <strong>{q.category}</strong></p>
              {q.animal && <p className={styles.animal}>Animal: <strong>{q.animal}</strong></p>}
              <p className={styles.date}>{new Date(q.date).toLocaleDateString()}</p>
              
              {q.answer && (
                <div className={styles.answerBox}>
                  <h4>Veterinarian's Response:</h4>
                  <p>{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {questions.length === 0 && (
          <p className={styles.emptyMessage}>No questions asked yet</p>
        )}
      </div>
    </>
  )
}

export default FarmerQuestions
