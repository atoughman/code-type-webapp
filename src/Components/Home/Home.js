import { useHistory } from "react-router-dom";
import './Home.scss'

import video from '../../assets/typing.mp4'
import typewriter from '../../assets/typewriter.mp4'

import { useEffect } from "react";

const Home = () => {

    const history = useHistory();

    const handleOnClick = () => {
        history.push('/practice')
    }

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.loader').classList.add('hide')
        }, 2000);
    }, [])

    return (
        <div className="home">
            <div className="loader">
                <video className="typewriter" autoPlay muted loop src={typewriter} />
            </div>
            <video className="type" autoPlay muted loop src={video} />
            <div className="main">
                <h1>Increase Your Coding Speed</h1>
                <button onClick={handleOnClick}>Start Practice</button>
            </div>
        </div>
    );
}

export default Home;