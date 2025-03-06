'use client'

import React, { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Nombre de points pour définir la forme organique de chaque cellule
const NUM_POINTS = 10

// Fonction utilitaire pour normaliser un angle entre -PI et PI
const normalizeAngle = angle => {
  while (angle > Math.PI) angle -= Math.PI * 2
  while (angle < -Math.PI) angle += Math.PI * 2
  return angle
}

const FluidEffect = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', handleResize)

    // --- PARAMÈTRES ---
    // Nombre de cellules et fonction aléatoire
    const NUM_CELLS = 5
    const rand = (min, max) => Math.random() * (max - min) + min

    // Couleur de fond bordeaux
    const backgroundColor = 'rgba(116,5,20,1)'

    // Création des cellules
    const cells = []
    for (let i = 0; i < NUM_CELLS; i++) {
      cells.push({
        x: rand(0, width),
        y: rand(0, height),
        // Vitesse réduite : plage plus faible
        vx: rand(-0.001, 0.001),
        vy: rand(-0.001, 0.001),
        baseRadius: rand(80, 150), // rayon de base
        // Variation de bruit pour la déformation
        noiseOffset: Math.random() * Math.PI * 100,
        // Couleur noire pour la cellule
        color: 'rgba(0, 0, 0, 0.1)'
      })
    }

    let time = 0

    const animate = () => {
      // Pour créer un effet de traînée, on redessine un fond semi-transparent
      ctx.fillStyle = 'rgba(116,5,20,0.15)'
      ctx.fillRect(0, 0, width, height)

      // Appliquer la répulsion entre cellules pour éviter qu’elles se superposent
      for (let i = 0; i < cells.length; i++) {
        for (let j = i + 1; j < cells.length; j++) {
          const cellA = cells[i]
          const cellB = cells[j]
          const dx = cellB.x - cellA.x
          const dy = cellB.y - cellA.y
          const dist = Math.hypot(dx, dy)
          const minDist = cellA.baseRadius + cellB.baseRadius
          if (dist < minDist && dist > 0) {
            // Calcul d'une force de répulsion proportionnelle au chevauchement
            const overlap = minDist - dist
            // Force fortement réduite : multiplier par 0.005 au lieu de 0.02
            const force = overlap * 0.005
            const fx = (dx / dist) * force
            const fy = (dy / dist) * force

            cellA.vx -= fx
            cellA.vy -= fy
            cellB.vx += fx
            cellB.vy += fy
          }
        }
      }

      // Mise à jour des positions
      cells.forEach(cell => {
        cell.x += cell.vx
        cell.y += cell.vy

        // Passage d'un bord à l'autre (wrap-around)
        if (cell.x - cell.baseRadius > width) cell.x = -cell.baseRadius
        else if (cell.x + cell.baseRadius < 0) cell.x = width + cell.baseRadius
        if (cell.y - cell.baseRadius > height) cell.y = -cell.baseRadius
        else if (cell.y + cell.baseRadius < 0) cell.y = height + cell.baseRadius
      })

      ctx.globalCompositeOperation = 'source-over'
      // Activation du flou
      ctx.shadowBlur = 10
      ctx.shadowColor = 'black'

      // Dessiner chaque cellule avec déformation organique
      cells.forEach((cell, idx) => {
        ctx.beginPath()
        const points = []
        for (let i = 0; i < NUM_POINTS; i++) {
          const angle = (i / NUM_POINTS) * 2 * Math.PI
          // Variation de base avec du bruit sinusoïdal
          let r =
            cell.baseRadius + Math.sin(time * 2 + cell.noiseOffset + i) * 15

          // Ajustement local en cas de contact avec une autre cellule
          cells.forEach((other, jdx) => {
            if (idx === jdx) return
            const dx = other.x - cell.x
            const dy = other.y - cell.y
            const d = Math.hypot(dx, dy)
            const contactThreshold = cell.baseRadius + other.baseRadius - 20 // marge
            if (d < contactThreshold) {
              const contactAngle = Math.atan2(dy, dx)
              const diff = Math.abs(normalizeAngle(angle - contactAngle))
              // Si l'angle du point est proche de la direction du contact, on "aplati" la cellule
              const influence = Math.max(0, (0.7 - diff) / 0.7)
              if (influence > 0) {
                // Réduction du rayon pour créer un aplatissement
                r -= influence * (contactThreshold - d) * 0.5
              }
            }
          })

          // Calcul du point sur le contour
          const px = cell.x + r * Math.cos(angle)
          const py = cell.y + r * Math.sin(angle)
          points.push({ x: px, y: py })
        }

        // Dessin de la forme organique via des courbes quadratiques pour lisser le contour
        const firstMid = {
          x: (points[NUM_POINTS - 1].x + points[0].x) / 2,
          y: (points[NUM_POINTS - 1].y + points[0].y) / 2
        }
        ctx.moveTo(firstMid.x, firstMid.y)
        for (let i = 0; i < points.length; i++) {
          const current = points[i]
          const next = points[(i + 1) % points.length]
          const midPoint = {
            x: (current.x + next.x) / 2,
            y: (current.y + next.y) / 2
          }
          ctx.quadraticCurveTo(current.x, current.y, midPoint.x, midPoint.y)
        }
        ctx.closePath()
        ctx.fillStyle = cell.color
        ctx.fill()
      })

      time += 0.005 // Vitesse d'animation réduite
      requestAnimationFrame(animate)
    }

    // Initialiser le fond en bordeaux
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100
      }}
    />
  )
}

export default dynamic(() => Promise.resolve(FluidEffect), { ssr: false })
