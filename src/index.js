import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from './Store.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage.js'
import Game from './Game.js'
import Rules from './Rules.js'

const app = (
    <StateProvider>
        <Router>
            <Switch>
                <Route exact path={"/"} component={LandingPage}/>
                <Route exact path={"/Game/:level"} component={Game}/>
                <Route exact path={"/Rules"} component={Rules}/>
                <Route render={() => <h1>Page not found!</h1>} />
            </Switch>
        </Router>
    </StateProvider>
);

ReactDOM.render(app, document.getElementById('root'));