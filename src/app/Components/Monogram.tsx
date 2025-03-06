'use client'

import React from 'react'

interface MonogramProps {
  color?: string;
  size?: number;
}

const Monogram: React.FC<MonogramProps> = ({
  color = '#000000',
  size = 400,
}) => {
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width={`90%`}
      height={'50%'}
      viewBox='0 0 300 320'
      preserveAspectRatio='xMidYMid meet'
    >
      <metadata>
        Created by potrace 1.10, written by Peter Selinger 2001-2011
      </metadata>
      <g
        transform='translate(0,320) scale(0.1,-0.1)'
        fill={color}
        stroke='none'
      >
        <path
          d='M420 1590 l0 -1270 414 0 c398 0 534 10 328 24 -329 22 -474 172
          -512 532 -7 64 -10 347 -8 799 4 682 5 702 26 782 69 263 201 364 508 392 74
          6 -9 9 -328 10 l-428 1 0 -1270z'
        />
        <path
          d='M1731 2856 c2 -2 58 -10 123 -16 192 -19 281 -55 370 -150 87 -93
          131 -228 145 -444 4 -67 4 -416 1 -776 -7 -624 -8 -659 -29 -738 -28 -109 -65
          -184 -124 -248 -80 -88 -185 -129 -392 -152 -59 -7 30 -10 343 -11 l422 -1 0
          1270 0 1270 -432 0 c-237 0 -429 -2 -427 -4z'
        />
      </g>
    </svg>
  )
}

export default Monogram
