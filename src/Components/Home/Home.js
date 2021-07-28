import { useEffect, useState } from "react";
import './Home.scss'

const Home = () => {

    const DATA_LEN = 9

    const [code, setCode] = useState(null)
    const [str, setStr] = useState('')
    const [counter, setCounter] = useState(0)
    const [listSpan, setListSpan] = useState(null)
    const [givenText, setGivenText] = useState('')
    
    let getRandomInt = () => {
        return Math.floor(Math.random() * DATA_LEN);
    }
    
    const [num, setNum] = useState(getRandomInt())
    
    const handleRefresh = () => {
        let rand = num
        while(rand === num ) rand = getRandomInt()
        setNum(rand)
    }

    useEffect(() => {

        fetch('http://localhost:8000/para/' + num)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setGivenText(data.text)
                let listt = []
                for (let i = 0; i < data.text.length; i++) {
                    listt.push(data.text[i]);
                }
                setCode(listt)
                let tmp = document.querySelectorAll('span[data-id]')
                setListSpan(tmp)
            })
    }, [num])

    const handleUpdateString = (e) => {
        let old_str = str
        let new_str = e.target.value

        if (old_str.length < new_str.length) {
            if (new_str[counter] === givenText[counter]) {
                listSpan[counter].setAttribute('class', 'correct')
            } else {
                listSpan[counter].setAttribute('class', 'incorrect')
            }
        } else {
            let diff = old_str.length - new_str.length
            for (let i = 1; i <= diff; i++) {
                listSpan[counter - i].removeAttribute('class')
            }
        }
        if (new_str.length === givenText.length) {
            if (new_str === givenText) alert('Congratulations, You have successfully typed the given text !!')
            else alert('You FAILED ( typed incorrect text )... Try Again')
            new_str = ''
            for (let i = 0; i < listSpan.length; i++) {
                listSpan[i].removeAttribute('class')
            }
            handleRefresh()
        }

        setStr(new_str)
        setCounter(new_str.length)
    }

    return (
        <div className="home">
            <div className="second">
                <div className="code-wrapper">
                    {code ? code.map((ch,i) => <span data-id={i} key={i}>{ch}</span>) : 'Loading Text...'}
                </div>
                <input type="text" value={str} onChange={handleUpdateString}></input>
                <button onClick={handleRefresh}>Change Text</button>
            </div>
        </div>
    );
}

export default Home;