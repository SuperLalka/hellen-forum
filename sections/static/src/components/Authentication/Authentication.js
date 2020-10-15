import React from 'react';
import css from './Authentication.css';
import {Link} from "react-router-dom";


class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            username: '',
            password: ''
        };
    }

    authFormToggle() {
        this.setState(currentState => ({
            isOpen: !currentState.isOpen
        }));
    }

    authFormSubmit(event) {
        event.preventDefault();
        let user_info = {
            username: this.state.username,
            password: this.state.password
        };

        fetch("/users/authorization", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user_info)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.isAuthorized(result.token);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    authFormChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        return (
            <div className="Authentication">
                {this.state.isOpen && (
                    <form className="Authentication__form" id="auth_form"
                          onSubmit={(event) => this.authFormSubmit(event)}>
                        <label htmlFor="username_field">Имя пользователя</label>
                            <input name="username"
                                   className="Authentication__input"
                                   id="username_field"
                                   type="text"
                                   value={this.state.email}
                                   onChange={(event) => this.authFormChange(event)}/>
                            <label htmlFor="password_field">Пароль</label>
                            <input name="password"
                                   className="Authentication__input"
                                   id="password_field"
                                   type="password"
                                   value={this.state.password}
                                   onChange={(event) => this.authFormChange(event)}/>
                    </form>
                )}
                {!this.state.isOpen
                    ? <button className="Authentication__toggle-button" type="button"
                              onClick={() => this.authFormToggle()}>Авторизация</button>
                    : <button className="Authentication__submit-button" type="submit"
                              form="auth_form">Авторизироваться</button>
                }
                <Link to={"/registration"} className="Authentication__registration-link">Нет аккаунта?</Link>
            </div>
        );
    }
}

export default Authentication;
