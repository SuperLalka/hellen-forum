import React from 'react';
import css from './CreateCommentBlock.css';


class CreateCommentBlock extends React.Component {
    constructor(props) {
        super(props);
        this.topic_id = this.props.topic_id;
        this.state = {
            openCommentInput: false,
            comment: '',
        };
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
                    this.props.upload_comments();
                    this.commentFormToggle();
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
            <div className="Comments__create-comment-block">
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
                <h3 className={this.state.openCommentInput
                    ? "Comments__form-title Comments__form-title_open"
                    : "Comments__form-title"}
                    onClick={() => this.commentFormToggle()}>
                    {this.state.openCommentInput
                        ? 'Скрыть'
                        : 'Присоединиться к обсуждению'}</h3>
            </div>
        );
    }
}

export default CreateCommentBlock;
