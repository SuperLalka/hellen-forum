import React from 'react';

import css from './Comment.css';


class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.upload_user_info();
    }

    upload_user_info() {
        fetch(`/api/user/${this.props.user_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        user: result
                    });
                },
            )
    }

    render() {
        return (
            <div className="Comments__item-text">
                <div className="Comments__item-author-block author-block">
                    <h3 className="author-block__username">{this.state.user.username}</h3>
                    <div className="author-block__avatar-block">
                        <img className="author-block__avatar-image" src={this.state.user.avatar} alt="user_avatar"/>
                    </div>
                    <p className="author-block__staff">{this.state.user.is_staff ? "Админ" : "Пользователь"}</p>
                    <p className="author-block__last_login">Был онлайн {this.state.user.last_login || "Никогда"}</p>
                </div>
                <div className="Comments__item-text-block">
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default Comment;
