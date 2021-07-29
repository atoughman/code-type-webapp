import { useEffect, useState } from "react";
import CustomText from "../CustomText/CustomText";
import Timer from "../Timer/Timer";
import './Home.scss'

const Home = () => {

    const DATA_LEN = 9

    // contains list of characters of givenText
    const [code, setCode] = useState(null)

    // str stores , how much the user has typed ( in active state )
    const [str, setStr] = useState('')
    const [counter, setCounter] = useState(0)

    // stores all the spans, to update specific spans
    const [listSpan, setListSpan] = useState(null)

    // contains text, out of which spans are created
    // also it's used to compare, whether the typed string is matching or not
    const [givenText, setGivenText] = useState('')
    const [message, setMessage] = useState('Click on above field to Start Type')
    const [isRunning, setIsRunning] = useState(false)

    // isReset is a toggler, which on change helps reset the timer. It's true or false value doesn't have specific meaning. State change is what matters :)
    const [isReset, setIsReset] = useState(false)

    // text user want to practice
    const [cusText, setCusText] = useState('')

    let getRandomInt = () => {
        return Math.floor(Math.random() * DATA_LEN);
    }
    
    let handleActiveState = () => {
        let textBox = document.querySelector('button[id="text-box"]')

        if(textBox === document.activeElement && message !== '!! Start Typing !!') {
            setMessage('!! Start Typing !!')
            document.querySelector('input[type]').focus()
            setIsRunning(true);
        } else if(textBox !== document.activeElement && message === '!! Start Typing !!'){
            setMessage('Click on above Text to Start Type')
            setIsRunning(false);
        }

    }

    const [num, setNum] = useState(getRandomInt())
    
    let toggleReset = () => {
        setIsReset(reset => !reset)
    }

    const handleRefresh = () => {
        let rand = num
        while(rand === num ) rand = getRandomInt()
        setNum(rand)
        for (let i = 0; i < listSpan.length; i++) {
            listSpan[i].removeAttribute('class')
        }
        setStr('')
        setCounter(0)
        toggleReset()
        // why we don't have to setIsReset here, without it why does it work ?
        // bcoz, to change text, we click on button, active element changes,
        // so it auto sets setIsReset :) in handleActiveState()
    }

    let convertTextToChar = (text) => {
        setGivenText(text)
        let listt = []
        for (let i = 0; i < text.length; i++) {
            listt.push(text[i]);
        }
        setCode(listt)
        let tmp = document.querySelectorAll('span[data-id]')
        setListSpan(tmp)
        tmp[0].setAttribute('class', 'active')   // to highlight the first character
    }

    useEffect(() => {
        fetch('http://localhost:8000/para/' + num)
            .then(res => {
                return res.json()
            })
            .then(data => {
                convertTextToChar(data.text)
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
            if(counter + 1 < listSpan.length)
                listSpan[counter + 1].classList.add('active') 
        } else {
            let diff = old_str.length - new_str.length
            for (let i = 0; i <= diff; i++) {
                listSpan[counter - i].removeAttribute('class')
            }
            listSpan[counter-diff].setAttribute('class', 'active') 
        }
        if (new_str.length === givenText.length) {
            if (new_str === givenText) alert('Congratulations, You have successfully typed the given text !!')
            else alert('You FAILED ( typed incorrect text )... Try Again')
            new_str = ''
            handleRefresh()
        }

        setStr(new_str)
        setCounter(new_str.length)
    }

    let handleCustomTextSubmit = () => {

        if(cusText) convertTextToChar(cusText)
        else alert('Field cannot be empty')
        setCusText('')
    }

    return (
        <div className="home" onClick={handleActiveState}>
            <div className="second">
                <div className="code-wrapper">
                    <button id="text-box">
                        {code ? code.map((ch,i) => <span data-id={i} key={i}>{ch}</span>) : 'Loading Text...'}
                    </button>
                </div>
                <input hide="true" type="text" value={str} onChange={handleUpdateString}></input>
                <p>{message}</p>
                <button onClick={handleRefresh}>Generate Random Text</button>
                <Timer isRunning={isRunning} isReset={isReset} toggleReset={toggleReset}/>
                <CustomText cusText={cusText} setCusText={setCusText}/>
                <button onClick={handleCustomTextSubmit}>Add Custom Text</button>
            </div>
        </div>
    );
}

export default Home;