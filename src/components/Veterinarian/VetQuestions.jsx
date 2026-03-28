import React from 'react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../Common/PageHeader'
import styles from './VetQuestions.module.css'

function VetQuestions() {
  const { questions, updateQuestion } = useApp()

  const handleReply = (question) => {
    const reply = window.prompt(`Reply to ${question.farmerName}'s question:\n\n"${question.question}"\n\nYour reply:`)
    if (reply) {
      updateQuestion(question.id, { 
        status: 'answered',
        answer: reply 
      })
    }
  }

  return (
    <>
      <PageHeader title="Questions" icon="fas fa-question-circle" />
      
      <div className={styles.container}>
        <div className={styles.questionsGrid}>
          {questions.map(q => (
            <div key={q.id} className={styles.questionCard}>
              <div className={styles.cardHeader}>
                <h3>{q.farmerName}</h3>
                <span className={`${styles.badge} ${styles[q.status]}`}>
                  {q.status}
                </span>
              </div>
              
              <div className={styles.cardContent}>
                <p className={styles.animal}>Animal: <strong>{q.animalName || 'General'}</strong></p>
                <p className={styles.question}>{q.question}</p>
                <small className={styles.date}>{new Date(q.date).toLocaleDateString()}</small>
              </div>

              {q.status === 'answered' && q.answer && (
                <div className={styles.answerSection}>
                  <h4>Your Reply:</h4>
                  <p className={styles.answer}>{q.answer}</p>
                </div>
              )}

              {q.status === 'pending' && (
                <button 
                  className={styles.replyBtn}
                  onClick={() => handleReply(q)}
                >
                  <i className="fas fa-reply"></i> Reply
                </button>
              )}
            </div>
          ))}
        </div>
        
        {questions.length === 0 && (
          <p className={styles.emptyMessage}>No questions yet</p>
        )}
      </div>
    </>
  )
}

export default VetQuestions
