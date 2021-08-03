import { useHistory } from "react-router-dom";
import './Home.scss'

import video from '../../assets/typing.mp4'

const Home = () => {

    const history = useHistory();

    const handleOnClick = () => {
        history.push('/practice')
    }

    return (
        <div className="home">
            <video autoplay="true" loop="true" muted="true" src={video} />
            <div className="main">
                <h1>Increase Your Coding Speed</h1>
                <button onClick={handleOnClick}>Start Practice</button>
            </div>
        </div>
    );
}

export default Home;