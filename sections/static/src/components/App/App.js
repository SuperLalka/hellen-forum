import React from 'react';

import Authentication from '../Authentication/Authentication';
import Comments from '../Comments/Comments';
import Registration from '../Registration/Registration';
import SectionsList from '../SectionsList/SectionsList';
import SubSections from '../SubSections/SubSections';
import Topics from '../Topics/Topics';

import css from './App.css';

import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: !!localStorage['username']
        }
    }

    isAuthorizedControl() {
        this.setState({
            isAuthorized: !!localStorage['username']
        });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Authentication isAuthorizedControl={() => this.isAuthorizedControl()}/>
                    <Switch>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/section/subsection/topics/:topic_id" render={(props) => <Comments isAuthorized={this.state.isAuthorized} {...props}/>}/>
                        <Route path="/section/subsection/:subsection_id" render={(props) => <Topics isAuthorized={this.state.isAuthorized} {...props}/>}/>
                        <Route path="/section/:section_id" render={(props) => <SubSections isAuthorized={this.state.isAuthorized} {...props}/>}/>
                        <Route exact path="/" render={(props) => <SectionsList isAuthorized={this.state.isAuthorized} {...props}/>}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
