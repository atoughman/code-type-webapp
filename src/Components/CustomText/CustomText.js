import './CustomText.scss'

const CustomText = ({cusText, setCusText}) => {
    return (
        <input type="text" value={cusText} onChange={(e) => setCusText(e.target.value)}/>
    );
}
 
export default CustomText;