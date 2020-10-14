import React from 'react';

import SubSections from '../SubSections/SubSections';
import SectionsList from '../SectionsList/SectionsList';
import Topics from '../Topics/Topics';
import Comments from '../Comments/Comments';
import css from './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


class App extends React.Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/section/subsection/topics/:topic_id" component={Comments} />
                        <Route path="/section/subsection/:subsection_id" component={Topics} />
                        <Route path="/section/:section_id" component={SubSections} />
                        <Route path="/" component={SectionsList} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
