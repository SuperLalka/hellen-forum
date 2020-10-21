import React from 'react';

import CreateTopicForm from "../CreateTopicForm/CreateTopicForm";
import ObjectList from "../ObjectList/ObjectList";

import css from './Topics.css';


class Topics extends React.Component {

    constructor(props) {
        super(props);
        this.subsection_id = this.props.match.params.subsection_id;
        this.state = {
            refresh_component: false
        }
    }

    refreshComponent() {
        this.setState(currentState => ({
            refresh_component: !currentState.refresh_component
        }));
    }

    render() {
        return (
            <div className="Topics__object">
                <ObjectList header_id={this.subsection_id}
                        upload_header_url={`/api/subsection/${this.subsection_id}`}
                        upload_objects_url={`/api/topics?subsection_id=${this.subsection_id}`}
                        link_below={"/section/subsection/topics/"}/>
                <CreateTopicForm subsection_id={this.subsection_id}
                                 refreshComponent={() => this.refreshComponent()}/>
            </div>
        );
    }
}

export default Topics;
