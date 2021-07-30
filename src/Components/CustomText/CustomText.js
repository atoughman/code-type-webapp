import './CustomText.scss'

/**
 * It provides the text which is to be uploaded as givenText. so user can practice his own text.
 * 
 * @param {string} cusText Text provided by user, to be uploaded as his/her practice (givenText)
 * @param {function} setCusText It is useState method 
 * @returns This component displays an input field in UI
 */
const CustomText = ({cusText, setCusText}) => {
    return (
        <input type="text" value={cusText} onChange={(e) => setCusText(e.target.value)}/>
    );
}
 
export default CustomText;