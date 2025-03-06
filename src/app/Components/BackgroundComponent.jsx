'use client'

import React, { useEffect } from 'react'
import { BlurGradientBg } from '../../jsm/BlurGradientBg.module.js'

const BackgroundComponent = () => {
  useEffect(() => {
    // Vérifiez que l'élément existe
    const boxElement = document.getElementById('box')
    if (!boxElement) {
      console.error("L'élément avec l'id 'box' n'existe pas !")
      return
    }
    // Instanciation du gradient
    const bgInstance = new BlurGradientBg({
      dom: 'box',
      colors: ['#861B1C', '#000000', '#861B1C', '#000000'],
      loop: true
    })

    return () => {
      if (bgInstance.destroy) {
        bgInstance.destroy()
      }
    }
  }, [])

  return (
    <div
      id='box'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      pointerEvents: 'none'

      }}
    />
  )
}

export default BackgroundComponent
