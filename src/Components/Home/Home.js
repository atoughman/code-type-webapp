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
        setStr(new_str)

        if(old_str.length < new_str.length) {
            if(new_str[counter] === para[counter]) {
                console.log("YES");
            } else {
                console.log("NO");
            }
        }
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