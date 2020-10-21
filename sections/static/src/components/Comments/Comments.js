import React from 'react';

import CreateCommentBlock from "../CreateCommentBlock/CreateCommentBlock";

import css from './Comments.css';


class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.topic_id = this.props.match.params.topic_id
        this.state = {
            topic: {},
            comments: false
        };
        this.upload_topic();
    }

    upload_topic() {
        fetch(`/api/topic/${this.topic_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        topic: result
                    });
                    this.upload_comments();
                },
            )
    }

    async upload_comments() {
        let response = await fetch(`/api/comments?topic_id=${this.topic_id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })

        if (response.ok) {
            let result = await response.json();

            this.setState({
                comments: result
            });
        } else {
            this.setState({
                comments: false
            });
        }
    }

    render() {
        return (
            <div className="Comments">
                <div className="Comments__start-topic-block">
                    <h2 className="Comments__topic-title">{this.state.topic.name}</h2>
                    <div className="Comments__topic-text">
                        {(this.state.topic.name !== undefined && this.state.topic.text !== undefined) &&
                        <DrawComments user_id={this.state.topic.user_id}
                                      text={this.state.topic.text}/>
                        }
                    </div>
                </div>
                {this.state.comments
                    ? <ul className="Comments__list-items">
                        {this.state.comments.map(comment => (
                            <li key={comment.id} className="Comments__item">
                                <DrawComments user_id={comment.user}
                                              text={comment.text}/>
                            </li>
                        ))}
                    </ul>
                    : <div className="Comments__unauthorized-error">
                        Комментарии скрыты от неавторизованных пользователей
                    </div>
                }
                <CreateCommentBlock topic_id={this.topic_id}
                                    upload_comments={() => this.upload_comments()}/>
            </div>
        );
    }
}

export function DrawComments(props) {
    return (
        <div className="Comments__item-text">
            <div className="Comments__item-author-block">
                {props.user_id}
            </div>
            <div className="Comments__item-text-block">
                {props.text}
            </div>
        </div>
    );
}

export default Comments;
