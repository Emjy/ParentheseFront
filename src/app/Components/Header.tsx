import React from 'react'
import styles from './Header.module.css'
import { SideBarProps } from './SideBar'

// Icons
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone'
import InstagramIcon from '@mui/icons-material/Instagram'

interface HeaderProps {
  selected: string
  navigateToSection: (section: string) => void
}
import Logo from './Logo'
export default function Header ({ selected, navigateToSection }: HeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.name} onClick={() => navigateToSection('Home')}>
        <Logo color='white' width='100%' height='100px' />
      </div>

      <div className={styles.rightContainer}>
        {/* <div className={styles.links}> <FacebookTwoToneIcon/></div>
        <div className={styles.links}> <InstagramIcon/> </div> */}
        <div className={styles.button}>BOOK NOW</div>
        {/* <div className={styles.langueButton}> FR </div> */}
      </div>
    </div>
  )
}
