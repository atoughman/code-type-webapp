import { useEffect, useState } from "react";
import AnticipationLoading from "../AnticipationLoading/AnticipationLoading";
import CustomText from "../CustomText/CustomText";
import Timer from "../Timer/Timer";
import './Home.scss'

const Home = () => {

    const DATA_LEN = 9

    // contains list of characters of givenText
    const [code, setCode] = useState(null)

    // str stores , how much the user has typed ( in active state )
    const [str, setStr] = useState('')

    // at which index cursor is...
    const [counter, setCounter] = useState(0)

    // stores all the spans, to update specific spans
    const [listSpan, setListSpan] = useState(null)

    // contains text, out of which spans are created
    // also it's used to compare, whether the typed string is matching or not
    const [givenText, setGivenText] = useState('')

    // Guildeline to the user
    const [message, setMessage] = useState('Click on Below Text to Start Type')

    // Whehter timer is running or stopped
    const [isRunning, setIsRunning] = useState(false)

    // isReset is a toggler, which on change helps reset the timer. It's true or false value doesn't have specific meaning. State change is what matters :)
    const [isReset, setIsReset] = useState(false)

    // text user want to practice
    const [cusText, setCusText] = useState('')

    // anticipation loading ( eg. 3...2...1..) 
    const [aLoading, setALoading] = useState(true)

    let getRandomInt = () => {
        return Math.floor(Math.random() * DATA_LEN);
    }

    const [num, setNum] = useState(getRandomInt())

    let toggleReset = () => {
        setIsReset(reset => !reset)
    }

    let handleActiveState = () => {
        let textBox = document.querySelector('button[id="text-box"]')

        if (textBox === document.activeElement && message !== '!! Start Typing !!') {
            setMessage('!! Start Typing !!')
            document.querySelector('input[type]').focus()
            setIsRunning(true);
        } else if (textBox !== document.activeElement && message === '!! Start Typing !!') {
            setMessage('Click on Below Text to Start Type')
            setIsRunning(false);
        }

    }

    /**
     * handle focus is fired only when text changes, so it is fine
     * to set typed string to emtpy
     * set at which index cursor is to 0
     * toggle reset which help to reset timer to 0
     * auto shift focus to typing text, to save an extra click
     */
    let handleFocus = () => {
        document.querySelector('button[id="text-box"]').focus()
        setStr('')
        setCounter(0)
        toggleReset()
        handleActiveState()
    }

    const handleRefresh = () => {
        let rand = num
        while (rand === num) rand = getRandomInt()
        for (let i = 0; i < listSpan.length; i++) {
            listSpan[i].removeAttribute('class')
        }
        setNum(rand)
        toggleReset()
        // why we don't have to setIsReset here, without it why does it work ?
        // bcoz, to change text, we click on button, active element changes,
        // so it auto sets setIsReset :) in handleActiveState()
    }

    useEffect(() => {
        if (!aLoading) {
            let tmp = document.querySelectorAll('span[data-id]')
            setListSpan(tmp)
            tmp[0].setAttribute('class', 'active')   // to highlight the first character
            handleFocus()
        }
    }, [aLoading])

    let highlighFirstChar = async () => {
        setALoading(true)
        setTimeout(() => {
            setALoading(false)
        }, 3000);
    }

    let convertTextToChar = (text) => {
        setGivenText(text)
        let listt = []
        for (let i = 0; i < text.length; i++) {
            listt.push(text[i]);
        }
        setCode(listt)
        highlighFirstChar()
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
            if (counter + 1 < listSpan.length)
                listSpan[counter + 1].classList.add('active')
        } else {
            let diff = old_str.length - new_str.length
            for (let i = 0; i <= diff; i++) {
                listSpan[counter - i].removeAttribute('class')
            }
            listSpan[counter - diff].setAttribute('class', 'active')
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

        if (cusText) convertTextToChar(cusText)
        else alert('Field cannot be empty')
        setCusText('')
        toggleReset()
    }

    return (
        <div className="home" onClick={handleActiveState}>
            <div className="second">
                {aLoading
                    ? <AnticipationLoading />
                    : <>
                        <p>{message}</p>
                        <Timer isRunning={isRunning} isReset={isReset} />
                        <div className="code-wrapper">
                            <button id="text-box">
                                {code ? code.map((ch, i) => <span data-id={i} key={i}>{ch}</span>) : 'Loading Text...'}
                            </button>
                        </div>
                    </>
                }
                <input hide="true" type="text" value={str} onChange={handleUpdateString}></input>
                <CustomText cusText={cusText} setCusText={setCusText} />
                <button onClick={handleCustomTextSubmit}>Add Custom Text</button>
                <button onClick={handleRefresh}>Generate Random Text</button>
            </div>
        </div>
    );
}

export default Home;