import React, { useContext } from 'react'
import Home from './Home'
import Header from './Header'
import Rooms from './Rooms'
import Recent from './Recent'
import Schedules from './Schedules'
import Notification from './Notification'
import styles from '../styles/Body.module.css'
import { AppContext } from '../pages/index'



const Body = () => {

    const [selectedIconIndex] = useContext(AppContext)

    const getBodyElement = () => {
        switch (selectedIconIndex) {
            case 0: return <Home />
            case 1: return <Recent />
            case 2: return <Rooms />
            case 3: return <Schedules />
            default: return <Notification />
        }
    }

    return (
        <div className={styles.bodyContainer} >

            <Header />
            {
                getBodyElement()
            }


        </div>
    )
}

export default Body