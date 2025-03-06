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

  // State pour stocker les dimensions de la fenêtre
  const [windowDimensions, setWindowDimensions] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Détermine si l'appareil est mobile (moins de 768px de largeur)
  const isMobile = windowDimensions.width < 768

  // Dimensions calculées dynamiquement
  const imageDimension = windowDimensions.height - 200
  const containerWidth = windowDimensions.width - 200
  const sidePadding = (containerWidth - imageDimension) / 2

  // Calcul de la largeur d'une série d'images et duplication pour effet infini
  const singleSetWidth = images.length * (imageDimension + marginRight)
  const carouselImages = [...images, ...images, ...images]

  // Positionnement initial du scroll pour centrer la série du milieu
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
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
