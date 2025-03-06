'use client'

import React from 'react'
import Header from '../Components/Header'

export default function page() {

      const [selected, setSelected] = React.useState('Home')
    
  return (
      <div>
          <Header selected={selected} setSelected={setSelected} />
    </div>
  )
}
