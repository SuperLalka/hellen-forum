import React from 'react';
import css from './Authentication.css';
import {Link} from "react-router-dom";


class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    authFormToggle() {
        this.setState((currentState) => ({
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
                    localStorage.setItem('token', 'Token ' + result.token);
                    localStorage.setItem('username', result.username);
                    localStorage.setItem('user_id', result.user_id);
                    this.setState({
                        isOpen: false,
                        username: '',
                        password: '',
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

    removeAuthentication() {
        fetch("/users/deauthorization", {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('user_id');
                    this.setState({
                        isOpen: false,
                        username: '',
                        password: '',
                    });
                },
            )
    }

    render() {
        return (
            <div className="Authentication">
                <Link to={"/"} className="Authentication__logo-block"/>
                {localStorage.getItem('username')
                    ? <div className="Authentication__container">
                        <p className="Authentication__user-info">Сейчас вы авторизованы
                            как {localStorage['username']}</p>
                        <Link to={"/"} className="Authentication__deauth-link"
                              onClick={() => this.removeAuthentication()}>Выйти из профиля</Link>
                    </div>
                    : <div className="Authentication__container">
                        {this.state.isOpen && (
                            <div>
                                <form className="Authentication__form" id="auth_form"
                                      onSubmit={(event) => this.authFormSubmit(event)}>
                                    <label autofocus htmlFor="username_field">Имя пользователя</label>
                                    <input name="username"
                                           className="Authentication__input"
                                           id="username_field"
                                           type="text"
                                           value={this.state.username}
                                           onChange={(event) => this.authFormChange(event)}/>
                                    <label htmlFor="password_field">Пароль</label>
                                    <input name="password"
                                           className="Authentication__input"
                                           id="password_field"
                                           type="password"
                                           value={this.state.password}
                                           onChange={(event) => this.authFormChange(event)}/>
                                </form>
                                <button className="Authentication__submit-button" type="submit"
                                        form="auth_form">Авторизироваться</button>
                            </div>
                        )}
                        {!this.state.isOpen && (
                            <button className="Authentication__toggle-button" type="button"
                                    onClick={() => this.authFormToggle()}>Авторизация</button>)}
                        <Link to={"/registration"} className="Authentication__registration-link">Нет аккаунта?</Link>
                    </div>
                }
            </div>
        );
    }
}

export default Authentication;
