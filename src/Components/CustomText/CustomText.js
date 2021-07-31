import './CustomText.scss'

/**
 * It provides the text which is to be uploaded as givenText. so user can practice his own text.
 * 
 * @param {string} cusText Text provided by user, to be uploaded as his/her practice (givenText)
 * @param {function} setCusText It is useState method 
 * @returns This component displays an input field and uploadFile button in UI
 */
const CustomText = ({ cusText, setCusText }) => {

    let showFile = async (e) => {
        // e.preventDefault()
        const reader = new FileReader()
        reader.readAsText(e.target.files[0])  // reads and stores value in e.target.result
        reader.onload = async (e) => {
            const text = (e.target.result)
            setCusText(text)
        };
    }

    return (
        <>
            <input type="text" value={cusText} onChange={(e) => setCusText(e.target.value)} />
            <div>
                <input type="file" onChange={(e) => showFile(e)} />
            </div>
        </>
    );
}

export default CustomText;