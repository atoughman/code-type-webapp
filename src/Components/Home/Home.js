import { useEffect, useState } from "react";
import style from './Home.module.scss'

const Home = () => {

    const [code, setCode] = useState([])
    const [str, setStr] = useState('')
    const [counter, setCounter] = useState(0)

    let para = 'Hey can you type this'
    useEffect(() => {
        let listt = []
        for(let i=0; i<para.length; i++) {
            listt.push(para[i]);
        }
        setCode(listt)
    }, [])

    const handleUpdateString = (e) => {
        let old_str = str
        let new_str = e.target.value
        
        if(old_str.length < new_str.length) {
            if(new_str[counter] === para[counter]) {
                console.log("YES");
            } else {
                console.log("NO");
            }
        }
        if(new_str.length === para.length) {
            if(new_str === para) alert('Congratulations, You have successfully typed the given text !!')
            else alert('You FAILED ( typed incorrect text )... Try Again')
            new_str = '' 
        }

        setStr(new_str)
        setCounter(new_str.length)
    }

    return (
        <div className={style.home}>
            <div className={style.code_wrapper}>
                {code.map((ch, i) => <span key={i}>{ch}</span>)}<br />
                {str}<br />
                <input type="text" value={str} onChange={handleUpdateString}></input>
            </div>
        </div>
    );
}
 
export default Home;