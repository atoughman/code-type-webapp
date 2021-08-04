import { useEffect } from "react";
import './Overlay.scss'

const Overlay = (props) => {

    useEffect(() => {
        if (props.isHidden) {
            document.querySelector('.overlay').classList.add('hide')
        } else {
            document.querySelector('.overlay').setAttribute('class', 'overlay')
        }
    }, [props.isHidden])


    let showFile = async (e) => {
        // e.preventDefault()
        const reader = new FileReader()
        reader.readAsText(e.target.files[0])  // reads and stores value in e.target.result
        reader.onload = async (e) => {
            const text = (e.target.result)
            props.setCusText(text)
        };
    }

    return (
        <div className="overlay">
            <div className="backdrop" onClick={() => props.setIsHidden(old_value => !old_value)}></div>
            <div className="content">
                <div className="cus-text">
                    <input type="file" onChange={(e) => showFile(e)} />
                    {/* <label for="file">Upload .txt File</label> */}
                    <textarea id="w3review" name="w3review" rows="4" cols="50" value={props.cusText} onChange={(e) => props.setCusText(e.target.value)}>
                        Type Here...
                    </textarea>
                </div>
                <button className="cross" onClick={() => props.setIsHidden(old_value => !old_value)}>Cancel</button>
                <button className="save" onClick={props.save}>Save</button>
            </div>
        </div>
    );
}

export default Overlay;