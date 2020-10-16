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
            openCommentInput: false,
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

    commentsFormChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value
        });
    }

    commentsFormSubmit(event) {
        event.preventDefault();

        fetch("/api/comments", {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                'text': this.state.comment,
                'topic_id': this.topic_id,
                'user_id': localStorage['user_id'],
            })
        })
            .then(() => {
                    this.setState({
                        comment: '',
                    });
                    this.upload_comments()
                }
            )
    }

    commentFormToggle() {
        this.setState(currentState => ({
            openCommentInput: !currentState.openCommentInput
        }));
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
                <h3 className={this.state.openCommentInput
                    ? "Comments__form-title"
                    : "Comments__form-title Comments__form-title_open"}
                    onClick={() => this.commentFormToggle()}>Присоединиться к обсуждению</h3>
                {this.state.openCommentInput ?
                    <form className="Comments__form" id="comments_form"
                          onSubmit={(event) => this.commentsFormSubmit(event)}>
                        <label htmlFor="password_field">Текст сообщения</label>
                        <textarea name="comment"
                                  className="Comments__input_textarea"
                                  id="comment_field"
                                  value={this.state.comment}
                                  onChange={(event) => this.commentsFormChange(event)}
                                  placeholder="Текст до 1000 знаков"/>
                        <button className="Comments__submit-button" type="submit"
                                form="comments_form">Опубликовать сообщение</button>
                    </form>
                    : null}
                <Link to="/">Вернуться на главную</Link>
            </div>
        );
    }
}

export default Comments;
