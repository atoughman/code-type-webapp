import { useEffect, useState } from "react";

// importing different components
import AnticipationLoading from "../AnticipationLoading/AnticipationLoading";
import CustomText from "../CustomText/CustomText";
import Timer from "../Timer/Timer";

// for styling
import './Home.scss'

const Home = () => {
    // [ HARD CODED ] number of different texts in data.json
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


    /**
     * To generate a random number in range [ 0, DATA_LEN )
     * @returns number
     */

    let getRandomInt = () => {
        return Math.floor(Math.random() * DATA_LEN);
    }

    // which text should be fetched from data.json [ 0 to DATA_len ) is stored in num
    const [num, setNum] = useState(getRandomInt())

    /**
     * It toggles the boolean "reset" between true and false
     */
    let toggleReset = () => {
        setIsReset(reset => !reset)
    }

    /** function => handleActiveState()
     * It is used to detect if a user is eligible to type the text... and hence displays
     * corresponding message on screen.
     * if yes
     *     it changes message
     *     it focuses input field which is hidden for user
     *     it resumes the timer
     * if no
     *    it changes message
     *    it stops the timer
     * 
     * P.S I have put double condition check to avoid running this function again and again
     */
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
     * handle focus is fired only when Giventext changes, so it is fine
     * to set typed string to emtpy
     * set at which index cursor is... to 0
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

    /**
     * When user clicks on generate random text... we need to keep everything in place
     * except, the given text should change... hence
     * - it generates a new random number
     * - removes all the class states ( active, correct etc. ) from the current text
     * - reset the timer to 0
     */
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

    /**
     * It is fired when we need anticipation loader
     * to fire this, we just toggle aLoading variable
     * 
     * - we locally store list of elements ( span ) who have data-id attribute in them.
     * - we then assign it to ListSpan so we can access it globally in code.
     * - we then set first span class as active.. 
     * 
     * P.S. Since it is also fired when aLoading is true ( coz that's also a state change )...
     *      I have put a condition to run the actual code only when aLoading is false
     *      because only then the spans are rendered and ony then we can grab them by below method 
     */
    useEffect(() => {
        if (!aLoading) {
            let tmp = document.querySelectorAll('span[data-id]')
            setListSpan(tmp)
            tmp[0].setAttribute('class', 'active')   // to highlight the first character
            handleFocus()
        }
    }, [aLoading])


    /**
     * - we are intentionally making user wait for 3 seconds... coz till then aLoading is true
     *   and hence anticipation loader is shown.
     * 
     *  P.S. Not sure if it has to be async
     *  READ MORE about anticipation loader in #4 Pull Request in github
     *  https://github.com/amanRecreates/code-type-webapp/pull/4
     */
    let highlighFirstChar = async () => {
        setALoading(true)
        setTimeout(() => {
            setALoading(false)
        }, 3000);
    }

    /**
     * It converts given text to array where each index stores single character
     * 
     * @param {string} text 
     * 
     * - We store this array in some state, so that we can access it across code.
     * - At last we highlight the first character of text..to let user know where cursor is.. &
     *   what character to type first.
     */
    let convertTextToChar = (text) => {
        setGivenText(text)
        let listt = []
        for (let i = 0; i < text.length; i++) {
            listt.push(text[i]);
        }
        setCode(listt)
        highlighFirstChar()
    }


    /**
     * It fetches response from data.json
     * then response is converted to javascript object
     * then data ( which is string here ) is converted to array of characters
     * 
     * P.S. conceptually it is known that string is nothing but array of chars but
     *      List has some methods like map... 
     *     hence it is required to convert string in terms of list of chars explicitly
     */
    useEffect(() => {
        fetch('http://localhost:8000/para/' + num)
            .then(res => {
                return res.json()
            })
            .then(data => {
                convertTextToChar(data.text)
            })
    }, [num])


    /** function => handleUpdateString()
     * It is fired everytime user does some activity on input field 
     * ( like delete, backspace, or type)
     * 
     * It makes sure that only that character is highlighted, which user has to type next
     * it checks if the previous typed character was 
     * - correct then assign green color to text by applying 'correct' class
     * - incorrect then assign red color to text by applying 'incorrect' class
     * 
     * It also checks if full text is typed
     * - if 100% correctly typed then display message "congrats"
     * - else display message "Failed"
     * 
     * @param {event} e 
     * 
     * P.S. I don't remember why I have used classList.add and not setAttribute at one place 
     */
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


    /**
     * When user tries to upload his/her own text, this funtion is fired
     * it uses same method of generate random text... just that instead of fetching
     * from data.json, this time it overrides that and passes users' provided text
     */
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