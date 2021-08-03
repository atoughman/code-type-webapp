import { useHistory } from "react-router-dom";
import './Home.scss'

import video from '../../assets/typing.mp4'
import typewriter from '../../assets/typewriter.mp4'

import { useEffect, useState } from "react";

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
                <video className="typewriter" autoplay="true" loop="true" muted="true" src={typewriter} />
            </div>
            <video className="type" autoplay="true" loop="true" muted="true" src={video} />
            <div className="main">
                <h1>Increase Your Coding Speed</h1>
                <button onClick={handleOnClick}>Start Practice</button>
            </div>
        </div>
    );
}

export default Home;