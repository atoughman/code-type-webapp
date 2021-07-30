import './AnticipationLoading.scss'
import { useState, useEffect } from 'react'

/**
 * @returns It displays timer like ( 3...2...1 ) before actually showing text to be typed
 */
const AnticipationLoading = () => {
    const [time, setTime] = useState(3)

    /**
     * This is fired only once after render which associates a setInterval
     * which itself fires every 1 second...
     * in every fire... it reduces the time value by 1
     * TRYING to depict as a countdown
     * 
     * And once this component is removed from DOM, cleanup function is fired which
     * stops the setInterval process as it is no longer required
     * if we will not do this, setInterval will keep running behind the screen
     * which is not good from performance perspective
     */
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