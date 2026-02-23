import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/role-selection')
  }

  return (
    <div className={styles.landing}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🐾</span>
            <span className={styles.logoText}>AnimalHealth Advisory</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#how-it-works" className={styles.navLink}>How It Works</a>
            <a href="#pricing" className={styles.navLink}>Pricing</a>
            <button className={styles.navButton} onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Expert Animal Health <span className={styles.highlight}>at Your Fingertips</span>
            </h1>
            <p className={styles.heroDescription}>
              Connecting veterinarians with farmers. Professional animal health advisory, real-time consultations, and trusted expertise for better livestock care.
            </p>
            <div className={styles.heroCTA}>
              <button className={styles.primaryBtn} onClick={handleGetStarted}>
                Start Free Trial
              </button>
              <button className={styles.secondaryBtn}>
                Watch Demo
              </button>
            </div>
            <p className={styles.heroSubtext}>
              ✓ No credit card required • ✓ Instant access • ✓ 24/7 support
            </p>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imagePlaceholder}>
              <span>🩺</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose AnimalHealth Advisory?</h2>
          <p>Trusted by 1000+ veterinarians and farmers across the region</p>
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👨‍⚕️</div>
            <h3>Expert Veterinarians</h3>
            <p>Access to qualified, licensed veterinarians ready to help with your animal health concerns.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Fast Response Times</h3>
            <p>Get answers to your questions within hours, not days. Quick appointments and consultations.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Health Records</h3>
            <p>Maintain detailed health records for all your animals in one secure, accessible place.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏥</div>
            <h3>Professional Advice</h3>
            <p>Get evidence-based recommendations and treatment plans from experienced professionals.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access your dashboard anytime, anywhere on any device with our responsive platform.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h3>Affordable Pricing</h3>
            <p>Transparent pricing with no hidden fees. Pay only for what you use.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <h2>How It Works</h2>
          <p>Simple, straightforward process for veterinarians and farmers</p>
        </div>
        
        <div className={styles.stepsContainer}>
          <div className={styles.stepsRow}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Sign Up</h3>
              <p>Choose your role - Veterinarian or Farmer - and create your account in minutes.</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Create Profile</h3>
              <p>Add your details, qualifications (for vets), or farm information (for farmers).</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>Start Connecting</h3>
              <p>Browse, book appointments, ask questions, and get expert advice instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Farmers Section */}
      <section className={styles.roleSection}>
        <div className={styles.roleSectionContent}>
          <div className={styles.roleText}>
            <h2>For Farmers</h2>
            <p className={styles.roleDescription}>
              Get professional veterinary advice for your livestock, manage animal health records, and connect with trusted experts.
            </p>
            <ul className={styles.roleList}>
              <li>✓ Book appointments with qualified veterinarians</li>
              <li>✓ Ask health questions anytime</li>
              <li>✓ Maintain digital health records</li>
              <li>✓ View market prices for livestock</li>
              <li>✓ Access agricultural updates and news</li>
            </ul>
          </div>
          <div className={styles.roleImage}>
            <div className={styles.imagePlaceholder}>
              <span>🚜</span>
            </div>
          </div>
        </div>
      </section>

      {/* For Veterinarians Section */}
      <section className={styles.roleSection + ' ' + styles.roleSecondary}>
        <div className={styles.roleSectionContent}>
          <div className={styles.roleImage}>
            <div className={styles.imagePlaceholder}>
              <span>🔬</span>
            </div>
          </div>
          <div className={styles.roleText}>
            <h2>For Veterinarians</h2>
            <p className={styles.roleDescription}>
              Expand your practice, manage appointments and consultations, and build your reputation as a trusted advisor.
            </p>
            <ul className={styles.roleList}>
              <li>✓ Manage your appointment calendar</li>
              <li>✓ Answer farmer questions and provide advice</li>
              <li>✓ Keep detailed medical records</li>
              <li>✓ Share professional resources and news</li>
              <li>✓ Build your professional network</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.sectionHeader}>
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that works best for you</p>
        </div>
        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <h3>Starter</h3>
            <p className={styles.price}>Free</p>
            <ul className={styles.pricingList}>
              <li>✓ Basic profile</li>
              <li>✓ 3 questions per month</li>
              <li>✓ Limited appointments</li>
              <li>✗ No priority support</li>
            </ul>
            <button className={styles.pricingBtn}>Get Started</button>
          </div>
          <div className={styles.pricingCard + ' ' + styles.pricingCardHighlight}>
            <div className={styles.badge}>Popular</div>
            <h3>Professional</h3>
            <p className={styles.price}>$99<span>/month</span></p>
            <ul className={styles.pricingList}>
              <li>✓ Full profile with verification</li>
              <li>✓ Unlimited questions</li>
              <li>✓ Unlimited appointments</li>
              <li>✓ Priority support</li>
            </ul>
            <button className={styles.pricingBtn + ' ' + styles.pricingBtnPrimary}>Start Free Trial</button>
          </div>
          <div className={styles.pricingCard}>
            <h3>Enterprise</h3>
            <p className={styles.price}>Custom</p>
            <ul className={styles.pricingList}>
              <li>✓ Everything in Professional</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated support</li>
              <li>✓ Team accounts</li>
            </ul>
            <button className={styles.pricingBtn}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of veterinarians and farmers using AnimalHealth Advisory</p>
        <button className={styles.ctaButton} onClick={handleGetStarted}>
          Create Your Free Account Today
        </button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>AnimalHealth Advisory</h4>
            <p>Connecting veterinarians with farmers for better animal health outcomes.</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 AnimalHealth Advisory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
