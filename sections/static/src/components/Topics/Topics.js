import React from 'react';
import {Link} from 'react-router-dom'
import css from './Topics.css';


class Topics extends React.Component {

    constructor(props) {
        super(props);
        this.subsection_id = this.props.match.params.subsection_id
        this.state = {
            openCreateInput: false,
            topic_name: null,
            topic_text: null,
            subsection: [],
            topics: []
        };
        this.upload_subsection();
        this.upload_topics();
    }

    upload_subsection() {
        fetch(`/api/subsection/${this.subsection_id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        subsection: result
                    });
                },
            )
    }

    upload_topics() {
        fetch(`/api/topics?subsection_id=${this.subsection_id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        topics: result
                    });
                },
            )
    }

    topicCreateFormChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value
        });
    }

    topicCreateFormSubmit(event) {
        event.preventDefault();

        fetch("/api/topics", {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                'name': this.state.topic_name,
                'text': this.state.topic_text,
                'subsection_id': this.subsection_id,
                'user_id': localStorage['user_id'],
            })
        })
            .then(() => {
                    this.setState({
                        topic_name: '',
                        topic_text: '',
                    });
                    this.upload_topics();
                    this.topicCreateFormToggle();
                }
            )
    }

    topicCreateFormToggle() {
        this.setState(currentState => ({
            openCreateInput: !currentState.openCreateInput
        }));
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
                {localStorage.getItem('username') && (
                    <div className="Topics__underlist-block">
                        {this.state.openCreateInput ?
                        <form className="Topics__create-object-form" id="create-topic_form"
                              onSubmit={(event) => this.topicCreateFormSubmit(event)}>
                            <input name="topic_name"
                                   className="Topics__input"
                                   id="topicname_field"
                                   type="text"
                                   value={this.state.topic_name}
                                   onChange={(event) => this.topicCreateFormChange(event)}
                                   placeholder="Название темы"/>
                            <textarea name="topic_text"
                                      className="Topics__input_textarea"
                                      id="topictext_field"
                                      value={this.state.topic_text}
                                      onChange={(event) => this.topicCreateFormChange(event)}
                                      placeholder="Текст до 1000 знаков"/>
                            <div className="Topics__buttons-block">
                                <button className="Topics__submit-button" type="submit">Создать</button>
                                <button className="Topics__cancelling-button" type="button"
                                        onClick={() => this.topicCreateFormToggle()}>Отмена</button>
                            </div>
                        </form>
                        : <button className="Topics__create-object-button" type="button"
                                onClick={() => this.topicCreateFormToggle()}>Создать новую тему</button>}
                    </div>
                )}
            </div>
        );
    }
}

export default Topics;
