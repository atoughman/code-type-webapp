import { useEffect } from "react";
import './Overlay.scss'

const Overlay = (props) => {

    useEffect(() => {
        if(props.isHidden) {
            document.querySelector('.overlay').classList.add('hide')
        } else {
            document.querySelector('.overlay').setAttribute('class','overlay')
        }
    }, [props.isHidden])

    return (
        <div className="overlay">
            {props.children}
            <button className="cross" onClick={() => props.setIsHidden(old_value => !old_value)}>Close</button>
        </div>
    );
}
 
export default Overlay; 