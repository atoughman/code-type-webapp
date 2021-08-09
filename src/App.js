import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from "./Components/Home/Home";
import Practice from "./Components/Practice/Practice";
import Error from "./Components/Error/error"

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/practice'>
                    <Practice />
                </Route>
                <Route >
                    <Error />
                </Route>
            </Switch>

        </Router>
    );
}

export default App;
