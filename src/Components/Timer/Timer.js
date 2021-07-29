import { useEffect, useState } from 'react';
import './Timer.scss'

const Timer = ({isRunning, isReset, toggleReset}) => {

    const [time, setTime] = useState(0)
    
    useEffect(() => {
        setTime(0)
    }, [isReset])

    useEffect(() => {
        let interval = null
        if(isRunning) {
            interval = setInterval(() => {
                setTime(time => time + 1)
            }, 1000)
        } 

        return () => {
            // cleanup function
            clearInterval(interval)
        }
    }, [isRunning, time])

    return (
        <p>Time Elapsed : {time} sec</p>
    );
}
 
export default Timer;