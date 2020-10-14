import React from 'react';
import { Link } from 'react-router-dom'
import css from './Topics.css';


class Topics extends React.Component {

    constructor(props) {
        super(props);
        this.subsection_id = this.props.match.params.subsection_id
        this.state = {
            error: null,
            isLoaded: false,
            subsection: [],
            topics: []
        };
        this.upload_subsection();
        this.upload_topics();
    }

    upload_subsection() {
        fetch(`/api/subsection/${this.subsection_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        subsection: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    upload_topics() {
        fetch(`/api/topics?subsection_id=${this.subsection_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        topics: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div className="Topics__object">
                <h2 className="Topics__title">{this.state.subsection.name}</h2>
                <ul className="Topics__list-items">
                    {this.state.topics.map(topic => (
                        <li key={topic.id} className="Topics__item">
                            <Link to={`/section/subsection/topics/${topic.id}`}>{topic.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Topics;
