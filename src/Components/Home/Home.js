import { useEffect, useState } from "react";
import './Home.scss'

const Home = () => {

    const [code, setCode] = useState(null)
    const [str, setStr] = useState('')
    const [counter, setCounter] = useState(0)
    const [listSpan, setListSpan] = useState(null)
    const [givenText, setGivenText] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [num, setNum] = useState(0)

    let getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {

        // #1 to make sure we get new text everytime on refresh
        let rand = num
        while(rand === num ) rand = getRandomInt(3)
        setNum(rand)
        // #1 DONE

        fetch('http://localhost:8000/para/' + rand)
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
                setListSpan(tmp) // I still don't get how useEffect actually works REALLY
            })
    }, [refresh])

    const handleUpdateString = (e) => {
        let old_str = str
        let new_str = e.target.value

        if (old_str.length < new_str.length) {
            if (new_str[counter] === givenText[counter]) {
                console.log("YES");
                listSpan[counter].setAttribute('class', 'correct')
            } else {
                console.log("NO");
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
            setRefresh(refresh + 1)
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
                <button onClick={() => setRefresh(refresh + 1)}>Change Text</button>
            </div>
        </div>
    );
}

export default Home;