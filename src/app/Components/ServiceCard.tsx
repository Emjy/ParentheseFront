import React from 'react'
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

export default function ServiceCard ({ image, title, description }: ServiceCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.infos}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  )
}
