import React from 'react';
import css from './Comments.css';
import {Link} from "react-router-dom";


class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.topic_id = this.props.match.params.topic_id
        this.state = {
            error: null,
            isLoaded: false,
            topic: [],
            comments: []
        };
        this.upload_topic();
        this.upload_comments();
    }

    upload_topic() {
        fetch(`/api/topic/${this.topic_id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        topic: result
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

    upload_comments() {
        fetch(`/api/comments?topic_id=${this.topic_id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        comments: result
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
            <div className="Comments">
                <h2 className="Comments__title">{this.state.topic.name}</h2>
                <ul className="Comments__list-items">
                    {this.state.comments.map(comment => (
                        <li key={comment.id} className="Comments__item">
                            <div className="Comments__item-text">
                                <p>{comment.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <Link to="/">Вернуться на главную</Link>
            </div>
        );
    }
}

export default Comments;
