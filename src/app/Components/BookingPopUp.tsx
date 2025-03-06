import React from 'react'

import styles from './Booking.module.css'
import { Button } from '@nextui-org/react'
import { DatePicker } from '@nextui-org/date-picker'
import { RangeCalendar } from '@nextui-org/react'
import { today, getLocalTimeZone } from '@internationalized/date'
import { parseDate } from '@internationalized/date'

export default function Booking () {
  let [value, setValue] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 })
  })

  const [hovered, setHovered] = React.useState(false)

  console.log(value)

  return (
    <>
      <div
        className={styles.container}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={styles.title}>Direct price : 50€ </div>

        {
          <RangeCalendar
            aria-label='Date (Controlled)'
            // value={value}
            onChange={(newValue) => setValue(newValue)}
            minValue={today(getLocalTimeZone())}
          />
        }

        <Button className={styles.button} color='default' size='sm'>
          BOOK
        </Button>
      </div>
    </>
  )
}
