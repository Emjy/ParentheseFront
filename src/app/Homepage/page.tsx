'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../Components/Header'
import SideBar from '../Components/SideBar'
import PhotoCarousel from '../Components/PhotoCarousel'
import BackgroundComponent from '../Components/BackgroundComponent'
import styles from './page.module.css'
import Logo from '../Components/Logo'
import Monogram from '../Components/Monogram'
import ServicePage from '../Components/ServicePage'

export default function Homepage () {
  const [selected, setSelected] = useState('Home')
  // Tableau d'images de fond à faire défiler
  const backgroundImages = [
    '/homeback1.jpg',
    '/homeback2.jpg', 
    '/homeback3.jpg', 
    '/homeback4.jpg', 
    '/homeback5.jpg', 
    '/homeback6.jpg', 
    '/homeback7.jpg', 
    '/homeback8.jpg', 
    '/homeback9.jpg', 
    '/homeback10.jpg', 
    // Ajoutez d'autres images si nécessaire
  ]
  const [bgIndex, setBgIndex] = useState(0)

  // Définir la variable CSS --vh pour ajuster la hauteur en tenant compte de la safe area
useEffect(() => {
  const setVh = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  setVh()
  window.addEventListener('resize', setVh)
  return () => window.removeEventListener('resize', setVh)
}, [])

  // Alterner l'image de fond toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgroundImages.length)
    }, 15000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  // Mise à jour de la section active via IntersectionObserver...
  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setSelected(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach(section => observer.observe(section))
    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setSelected(sectionId)
    }
  }

  return (
    <div className={styles.pageContainer}>
      {/* Composant de fond si la section n'est pas "Home" */}
      {selected !== 'Home' && <BackgroundComponent />}

      <AnimatePresence>
        {selected !== 'Home' && (
          <motion.div
            key='header'
            initial={{  opacity: 0 }}
            animate={{  opacity: 1 }}
            exit={{  opacity: 0 }}
            transition={{ duration: 3 }}
          >
            <Header selected={selected} navigateToSection={navigateToSection} />
          </motion.div>
        )}
      </AnimatePresence>

      {selected !== 'Home' && (
        <div className={styles.sideBarContainer}>
          <SideBar selected={selected} navigateToSection={navigateToSection} />
        </div>
      )}

      <div className={styles.contentContainer}>
        {/* Section Home */}
        <section id='Home' className={styles.sectionHome}>
          {/* Conteneur de fond avec background noir */}
          <div
            className={styles.homeBackgroundContainer}
            style={{ backgroundColor: '#000' }}
          >
            <AnimatePresence>
              <motion.img
                key={backgroundImages[bgIndex]}
                src={backgroundImages[bgIndex]}
                alt='home background'
                className={styles.homeBackground}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
              />
            </AnimatePresence>
          </div>
          <div className={styles.logoContainer}>
            <Monogram color='white' />
            <Logo color='white' width='100%' height='200px' />
            <div className={styles.homeButtons}>
              <div
                className={styles.button}
                onClick={() => navigateToSection('Photos')}
              >
                DISCOVER
              </div>
              <div className={styles.button}>BOOK NOW</div>
            </div>
          </div>
        </section>

        {/* SECTION PHOTOS */}
        <section id='Photos' className={styles.section}>
          <PhotoCarousel />
        </section>

        {/* Section Services */}
        <section id='Services' className={styles.sectionFull}>
          <ServicePage />
        </section>

        {/* Section Contact */}
        <section id='Contact' className={styles.sectionFull}>
          <div className={styles.infoContainer}>
            <img src='/mapnancy.png' alt='map' className={styles.map} />
            <div className={styles.contactInfo}>
              <div>{'2 rue de la Commanderie, 54000 Nancy'}</div>
              <div>{'07 83 45 67 89'}</div>
              <div>{'contact@laparenthese.fr'}</div>
            </div>
          </div>
        </section>

        {/* Section About */}
        <section id='About' className={styles.sectionFull}>
          <h1 className={styles.title}>About</h1>
        </section>
      </div>
    </div>
  )
}
