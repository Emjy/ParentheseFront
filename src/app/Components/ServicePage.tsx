'use client'

import React from 'react'
import ServiceCard from './ServiceCard'
import styles from './ServicePage.module.css'

const services = [
  {
    title: 'Accessoires coquins et sextoys',
    image: './toys.jpg',
    description:
      "Découvrez une sélection d'accessoires coquins et de sextoys de qualité, soigneusement choisis pour pimenter vos moments intimes et stimuler vos sens."
  },
  {
    title: 'Jacuzzi',
    image: './jacuzzi.jpg',
    description:
      'Détendez-vous dans notre jacuzzi luxueux, offrant une expérience de bain chaud et relaxant, idéale pour un moment de bien-être en duo.'
  },
  {
    title: 'Cinema',
    image: './cinema.jpg',
    description:
      'Profitez de séances privées dans notre salle de cinéma ultra-moderne, pour vivre une expérience immersive et inoubliable en toute intimité.'
  },
  {
    title: 'Lit king size',
    image: './lit.jpg',
    description:
      'Reposez-vous dans un lit king size somptueux, conçu pour offrir confort et détente absolue, dans un cadre élégant et raffiné.'
  },
  {
    title: "Sling (balançoire de l'amour)",
    image: './sling.webp',
    description:
      "Laissez-vous tenter par notre sling, alias balançoire de l'amour, pour explorer de nouvelles sensations dans un environnement sécurisé et ludique."
  },
  {
    title: 'Balcon',
    image: './jacuzzi.jpg',
    description:
      'Admirez la vue panoramique depuis notre balcon privé, l’endroit parfait pour partager un moment romantique ou une conversation en toute tranquillité.'
  },
  {
    title: 'Alcool & Poppers (en option)',
    image: './poppers.jpg',
    description:
      'Ajoutez une touche festive à votre expérience avec notre sélection d’alcools fins et de poppers, disponibles en option pour ceux qui le souhaitent.'
  },
  {
    title: 'Champagne (en option)',
    image: './champagne.jpg',
    description:
      'Célébrez vos moments d’exception avec du champagne premium, servi pour sublimer vos instants de plaisir et de convivialité.'
  }
]

export default function ServicePage () {
  return (
    <div className={styles.container}>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          image={service.image}
          title={service.title}
          description={service.description}
        />
      ))}
    </div>
  )
}
