'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Monogram from './Monogram'
import styles from './PhotoCarousel.module.css'

const PhotoCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const images = [
    '/images/carousel/1.jpg',
    '/images/carousel/2.jpg',
    '/images/carousel/3.jpg',
    '/images/carousel/4.png',
    '/images/carousel/5.png',
    '/images/carousel/6.jpg',
    '/images/carousel/7.jpg',
    '/images/carousel/8.jpg'
  ]

  const marginRight = 20

  // Initialiser avec des valeurs par défaut pour éviter l'accès direct à "document" lors du SSR
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    // Mettre à jour les dimensions côté client
    const handleResize = () => {
      setWindowDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      })
    }

    // Définir les dimensions initiales
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Détermine si l'appareil est mobile (moins de 768px de largeur)
  const isMobile = windowDimensions.width < 768

  // Calcul des dimensions uniquement si on a une largeur > 0
  const imageDimension =
    windowDimensions.width > 0 ? windowDimensions.height - 200 : 0
  const containerWidth =
    windowDimensions.width > 0 ? windowDimensions.width - 200 : 0
  const sidePadding =
    containerWidth > 0 ? (containerWidth - imageDimension) / 2 : 0

  // Calcul de la largeur d'une série d'images et duplication pour effet infini
  const singleSetWidth =
    imageDimension > 0 ? images.length * (imageDimension + marginRight) : 0
  const carouselImages = [...images, ...images, ...images]

  // Positionnement initial du scroll pour centrer la série du milieu
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container && sidePadding && singleSetWidth) {
      container.scrollLeft = sidePadding + singleSetWidth
    }
  }, [sidePadding, singleSetWidth])

  // Ajustement du scroll pour simuler un effet infini
  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      if (container.scrollLeft <= sidePadding) {
        container.scrollLeft += singleSetWidth
      } else if (container.scrollLeft >= sidePadding + singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth
      }
    }
  }

  // Défilement automatique lent vers la droite
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const autoScrollInterval = setInterval(() => {
      container.scrollLeft += 1
      handleScroll()
    }, 30)
    return () => clearInterval(autoScrollInterval)
  }, [sidePadding, singleSetWidth])

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className={styles.scrollContainer}
    >
      <div
        className={styles.innerWrapper}
        style={{
          marginLeft: sidePadding,
          marginRight: sidePadding
        }}
      >
        {carouselImages.map((src, index) => (
          <div
            key={index}
            className={styles.imageContainer}
            style={{
              minWidth: `${imageDimension}px`,
              minHeight: `${imageDimension}px`
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              initial={{ filter: isMobile ? 'none' : 'blur(10px)' }}
              whileHover={{ filter: isMobile ? 'none' : 'blur(0px)' }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.1 }}
              className={styles.imageContent}
              style={{
                backgroundImage: `url(${src})`
              }}
            />
            {hoveredIndex !== index && (
              <div className={styles.monogramWrapper}>
                <Monogram color='white' size={100} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotoCarousel
