import React from 'react';

import Authentication from '../Authentication/Authentication';
import Comments from '../Comments/Comments';
import Registration from '../Registration/Registration';
import SectionsList from '../SectionsList/SectionsList';
import SubSections from '../SubSections/SubSections';
import Topics from '../Topics/Topics';

import css from './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
        };
    }

    isAuthorized(token) {
        this.setState({
            token: token
        });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Authentication isAuthorized={(token) => this.isAuthorized(token)} />
                    <Switch>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/section/subsection/topics/:topic_id" component={Comments}/>
                        <Route path="/section/subsection/:subsection_id" component={Topics}/>
                        <Route path="/section/:section_id" component={SubSections}/>
                        <Route exact path="/" component={SectionsList}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
