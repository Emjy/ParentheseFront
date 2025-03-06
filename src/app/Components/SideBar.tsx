'use client'

import React from 'react'
import styles from './SideBar.module.css'

export interface SideBarProps {
  selected: string
  navigateToSection: (section: string) => void
}

export default function SideBar ({ selected, navigateToSection }: SideBarProps) {
  const [showText, setShowText] = React.useState(false)

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <div
        className={styles.sideBarElement}
        onClick={() => navigateToSection('Home')}
      >
        <div style={{ opacity: showText ? 1 : 0, transition: 'opacity 500ms' }}>
          HOME
        </div>
        <div
          className={styles.pin}
          style={{ backgroundColor: selected === 'Home' ? 'white' : 'black' }}
        />
      </div>
      <div
        className={styles.sideBarElement}
        onClick={() => navigateToSection('Photos')}
      >
        <div style={{ opacity: showText ? 1 : 0, transition: 'opacity 500ms' }}>
          PHOTOS
        </div>
        <div
          className={styles.pin}
          style={{ backgroundColor: selected === 'Photos' ? 'white' : 'black' }}
        />
      </div>
      <div
        className={styles.sideBarElement}
        onClick={() => navigateToSection('Services')}
      >
        <div style={{ opacity: showText ? 1 : 0, transition: 'opacity 500ms' }}>
          EXPERIENCES
        </div>
        <div
          className={styles.pin}
          style={{
            backgroundColor: selected === 'Services' ? 'white' : 'black'
          }}
        />
      </div>
      <div
        className={styles.sideBarElement}
        onClick={() => navigateToSection('Contact')}
      >
        <div style={{ opacity: showText ? 1 : 0, transition: 'opacity 500ms' }}>
          CONTACT
        </div>
        <div
          className={styles.pin}
          style={{
            backgroundColor: selected === 'Contact' ? 'white' : 'black'
          }}
        />
      </div>
      <div
        className={styles.sideBarElement}
        onClick={() => navigateToSection('About')}
      >
        <div style={{ opacity: showText ? 1 : 0, transition: 'opacity 500ms' }}>
          ABOUT
        </div>
        <div
          className={styles.pin}
          style={{ backgroundColor: selected === 'About' ? 'white' : 'black' }}
        />
      </div>
    </div>
  )
}
