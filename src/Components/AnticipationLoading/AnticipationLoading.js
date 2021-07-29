import './AnticipationLoading.scss'
import { useState, useEffect } from 'react'

const AnticipationLoading = () => {
    const [time, setTime] = useState(3)

    useEffect(() => {
        let interval = setInterval(() => {
            setTime(time => time - 1)
        }, 1000)

        return () => {
            // cleanup function
            clearInterval(interval)
        }
    }, [])

    return (
        <h1>{time}</h1>
    );
}

export default AnticipationLoading;