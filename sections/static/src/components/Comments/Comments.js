import React from 'react';

import CreateCommentBlock from "../CreateCommentBlock/CreateCommentBlock";
import Comment from "../Comment/Comment";

import css from './Comments.css';


class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.topic_id = this.props.match.params.topic_id
        this.state = {
            isAuthorized: this.props.isAuthorized,
            topic: {},
            comments: false,
        };
        this.upload_topic();
    }

    upload_topic() {
        fetch(`/api/topics/${this.topic_id}/`)
            .then(response => response.json())
            .then(
                (response) => {
                    this.setState({
                        topic: response,
                    });
                    this.upload_comments();
                },
            )
    }

    upload_comments() {
        fetch(`api/comments/?topic_id=${this.topic_id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(
                (response) => {
                    if (response.ok) {
                        response.json()
                            .then(response => this.setState({comments: response}))
                    } else {
                        this.setState({
                            comments: false
                        });
                    }
                },
            )
    }

    render() {
        return (
            <div className="Comments">
                <div className="Comments__start-topic-block">
                    <h2 className="Comments__topic-title">{this.state.topic.name}</h2>
                    <div className="Comments__topic-text">
                        {(this.state.topic.name !== undefined && this.state.topic.text !== undefined) &&
                        <Comment user_id={this.state.topic.user_id}
                                 text={this.state.topic.text}/>
                        }
                    </div>
                </div>
                {this.state.comments && this.state.isAuthorized
                    ? <ul className="Comments__list-items">
                        {this.state.comments.map(comment => (
                            <li key={comment.id} className="Comments__item">
                                <Comment user_id={comment.user}
                                         text={comment.text}/>
                            </li>
                        ))}
                    </ul>
                    : <div className="Comments__unauthorized-error">
                        Комментарии скрыты от неавторизованных пользователей
                    </div>
                }
                {this.state.isAuthorized && (
                    <CreateCommentBlock topic_id={this.topic_id}
                                        upload_comments={() => this.upload_comments()}/>
                )}
            </div>
        );
    }
}

export default Comments;
