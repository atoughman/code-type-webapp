import { useEffect, useState } from 'react';
import './Timer.scss'

/**
 * 
 * @param {Boolean} isRunning It tells whether the timer should run or stop and it's not other way around
 * @param {Boolean} isReset It tells whether the timer should be set to 0 and it's not other way around
 * @returns A text which updates itself every second, trying to depict as stopwatch.
 * 
 * P.S. other way around means, we are not setting these values here and letting parent component know
 *      what that should do...
 *     instead, parent component is telling this child component what to do
 */
const Timer = ({isRunning, isReset}) => {

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
    }, [isRunning])

    return (
        <p className="stopwatch">Time Elapsed : {time} sec</p>
    );
}
 
export default Timer;