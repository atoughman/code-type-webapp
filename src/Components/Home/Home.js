import { useEffect, useState } from "react";
import './Home.scss'
// Checking signature [ ignore ]
const Home = () => {

    const [code, setCode] = useState(null)
    const [str, setStr] = useState('')
    const [counter, setCounter] = useState(0)
    const [ isTyped, setIsTyped] = useState(false)
    const [listSpan, setListSpan] = useState(null)
    let para = 'what are you'
    
    useEffect(() => {
        setTimeout(() => {
            let listt = []
            for(let i=0; i<para.length; i++) {
                listt.push(para[i]);
            }
            setCode(listt)

            let tmp = document.querySelectorAll('span[data-id]')
            setListSpan(tmp) // I still don't get how useEffect actually works REALLY
        }, 1000);
    }, [para])

    const update_list_span = () => {
        
    }

    const handleUpdateString = (e) => {
        let old_str = str
        let new_str = e.target.value
        
        if(!isTyped) update_list_span()
        setIsTyped(true)

        if(old_str.length < new_str.length) {
            if(new_str[counter] === para[counter]) {
                console.log("YES");
                listSpan[counter].setAttribute('class', 'correct')
            } else {
                console.log("NO");
                listSpan[counter].setAttribute('class', 'incorrect')
            }
        } else {
            let diff = old_str.length - new_str.length
            for(let i = 1; i<=diff; i++) {
                listSpan[counter-i].removeAttribute('class')
            }
        }
        if(new_str.length === para.length) {
            if(new_str === para) alert('Congratulations, You have successfully typed the given text !!')
            else alert('You FAILED ( typed incorrect text )... Try Again')
            new_str = '' 
            for(let i=0; i<listSpan.length; i++) {
                listSpan[i].removeAttribute('class') 
            }
        }

        setStr(new_str)
        setCounter(new_str.length)
    }

    return (
        <div>
            <div>
                {code ? code.map((ch, i) => <span data-id={i} key={i}>{ch}</span>) : 'Loading'}<br />
                {str}<br />
                <input type="text" value={str} onChange={handleUpdateString}></input>
            </div>
        </div>
    );
}
 
export default Home;