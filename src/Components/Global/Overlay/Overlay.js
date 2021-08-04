import { useEffect } from "react";
import './Overlay.scss'

const Overlay = (props) => {

    useEffect(() => {
        if(props.isHidden) {
            document.querySelector('.backdrop').classList.add('hide')
        } else {
            document.querySelector('.backdrop').setAttribute('class','backdrop')
        }
    }, [props.isHidden])

    return (
        <div className="backdrop">
            <div className="overlay">
                {props.children}
                <button className="cross" onClick={() => props.setIsHidden(old_value => !old_value)}>Close</button>
            </div>
        </div>
    );
}
 
export default Overlay; 