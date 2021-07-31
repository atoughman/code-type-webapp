import { useEffect, useState } from "react";
import './Notification.scss'

/**
 * Used to display message at top right corner of screen
 * @param {String} type "success", "danger", "general" [by default]
 * @returns a div with some text
 */
const Notification = ({ isHidden, message, type}) => {

    const [classes, setClasses] = useState(['notification-message'])

    useEffect(() => {
        let tmp = classes
        if (isHidden) {
            tmp = ['notification-message','hide']
            setClasses(tmp)
        } else {
            tmp.pop()
            switch (type) {
                case 'success':
                    tmp.push('success')
                    break;
                case 'danger':
                    tmp.push('danger')
                    break;
                default:
                    tmp.push('general')
                    break;
            }
            setClasses(tmp)
        }
        document.querySelector('.notification-message').setAttribute('class', tmp.join(' '))
    }, [isHidden])

    return (
        <div className="notification-message">
            {message}
        </div>
    );
}

export default Notification;