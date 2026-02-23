import React from 'react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../Common/PageHeader'
import styles from './FarmerMarket.module.css'

function FarmerMarket() {
  const mockMarketPrices = [
    { commodity: 'Milk', price: '$0.45/L', change: '+2.3%', trend: 'up' },
    { commodity: 'Beef', price: '$4.20/kg', change: '-1.2%', trend: 'down' },
    { commodity: 'Chicken', price: '$2.80/kg', change: '+0.8%', trend: 'up' },
    { commodity: 'Eggs', price: '$2.50/dozen', change: '+3.1%', trend: 'up' },
    { commodity: 'Wool', price: '$5.60/kg', change: '-0.5%', trend: 'down' },
    { commodity: 'Goat Milk', price: '$1.20/L', change: '+1.5%', trend: 'up' }
  ]

  return (
    <>
      <PageHeader title="Market Prices" icon="fas fa-chart-line" />
      
      <div className={styles.container}>
        <div className={styles.pricesGrid}>
          {mockMarketPrices.map((item, idx) => (
            <div key={idx} className={styles.priceCard}>
              <h4>{item.commodity}</h4>
              <p className={styles.price}>{item.price}</p>
              <p className={`${styles.change} ${styles[item.trend]}`}>
                <i className={`fas fa-arrow-${item.trend === 'up' ? 'up' : 'down'}`}></i>
                {item.change}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.trendsSection}>
          <h3>Market Trends</h3>
          <div className={styles.trendsChart}>
            <i className="fas fa-chart-line"></i>
            <p>Chart visualization coming soon</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default FarmerMarket
