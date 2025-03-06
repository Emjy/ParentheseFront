import React from 'react'

// Styles
import styles from './Card.module.css';


interface Props {
    photo: string
    name: string
}

export default function Card(props: Props) {
    return (
        <div className={styles.card}>
            <img src={props.photo} alt="placeholder" />
            <div className={styles.text}>
                {props.name}
            </div>
        </div>
    )
}
