import React from 'react'

// Components 
import Card from '../Components/Card'

export default function menu() {
    return (
        <div style={{ display: 'flex' }}>
            <Card photo={'./hotel1.jpg'} name={'Home'} />
            <Card photo={'./hotel2.jpeg'} name={'Reservation'} />
            <Card photo={'./hotel3.jpeg'} name={'Photos'} />
            <Card photo={'./hotel4.jpeg'} name={'Autres'} />
            <Card photo={'./hotel5.jpeg'} name={'Contacts'} />
        </div>
    )
}
