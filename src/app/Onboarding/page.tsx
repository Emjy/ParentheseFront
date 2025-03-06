'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'

import styles from './Page.module.css'

export default function onboarding() {
  const router = useRouter()
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (isClicked) {
      const timeout = setTimeout(() => {
        router.push('/Homepage') // Redirige vers la homepage après l'animation
      }, 500) // Durée de l'animation de zoom et de fondu

      return () => clearTimeout(timeout)
    }
  }, [isClicked, router])

  return (
    <motion.div
      className={styles.name}
      style={{ display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center', fontSize: '15rem', cursor: 'pointer' }}
      onClick={() => setIsClicked(true)}
      initial={{ scale: 1, opacity: 1 }}
      animate={isClicked ? { scale: 1.2, opacity: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {'('}
      <TypeAnimation
        
        sequence={[
          '', 
          0,
          'Parenthèse',  
          1000,
        ]}
        wrapper="span"
        speed={5}
        cursor={false}  
      />
      {')'}
    </motion.div>
  )
}