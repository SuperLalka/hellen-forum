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

    isAuthorizedControl(result) {
        if (result) {
            localStorage.setItem('token', 'Token ' + result.token);
            localStorage.setItem('username', result.username);
            localStorage.setItem('user_id', result.user_id);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('user_id');
        }
        this.isAuthorized();
    }

    isAuthorized() {
        this.setState({
            isAuthorized: !!localStorage['username']
        });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Authentication isAuthorizedControl={(result) => this.isAuthorizedControl(result)}
                                    isAuthorized={this.state.isAuthorized}/>
                    <Switch>
                        <Route path="/registration" key={'auth=' + this.state.isAuthorized} component={Registration}/>
                        <Route path="/section/subsection/topics/:topic_id" key={'auth=' + this.state.isAuthorized}
                               render={(props) => <Comments isAuthorized={this.state.isAuthorized} {...props}/>}/>
                        <Route path="/section/subsection/:subsection_id" key={'auth=' + this.state.isAuthorized}
                               render={(props) => <Topics isAuthorized={this.state.isAuthorized} {...props}/>}/>
                        <Route path="/section/:section_id" key={'auth=' + this.state.isAuthorized}
                               render={(props) => <SubSections isAuthorized={this.state.isAuthorized} {...props}/>}/>
                        <Route exact path="/" key={'auth=' + this.state.isAuthorized}
                               render={(props) => <SectionsList isAuthorized={this.state.isAuthorized} {...props}/>}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
