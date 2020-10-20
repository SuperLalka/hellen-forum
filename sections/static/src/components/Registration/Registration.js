import React from 'react';
import css from './Registration.css';
import Redirect from "react-router-dom/es/Redirect";


class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: null,
            redirect: false,
            username: '',
            email: '',
            password: ''
        };
    }

    async regFormSubmit(event) {
        event.preventDefault();
        let user_info = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        let response = await fetch("/users/registration", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user_info)
        })

        if (response.ok) {
            let result = await response.json();

            localStorage.setItem('token', 'Token ' + result.token);
            localStorage.setItem('username', result.username);
            localStorage.setItem('user_id', result.user_id);

            this.setState({
                username: '',
                email: '',
                password: '',
                redirect: true,
            });
        } else {
            this.setState({
                errors: await response.json(),
            });
            setTimeout(() => {
                this.setState({
                    errors: null,
                })
            }, 5000);
        }
    }

    regFormChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"/>
        } else {
            return (
                <div className="Registration">
                    <h2 className="Registration__title">Регистрация нового пользователя</h2>
                    {this.state.errors && (
                        <div className="Registration__form-errors">
                            {Object.values(this.state.errors).map((text) => (
                                <p className="Registration__form-errors-text">{text}</p>
                            ))}
                        </div>
                    )}
                    <form className="Registration__form" id="registration_form"
                          onSubmit={(event) => this.regFormSubmit(event)}>
                        <label htmlFor="username_field" className="Registration__label">Имя пользователя</label>
                        <input name="username"
                               className="Registration__input"
                               id="username_field"
                               type="text"
                               value={this.state.username}
                               onChange={(event) => this.regFormChange(event)}/>
                        <label htmlFor="email_field" className="Registration__label">Email пользователя</label>
                        <input name="email"
                               className="Registration__input"
                               id="email_field"
                               type="email"
                               value={this.state.email}
                               onChange={(event) => this.regFormChange(event)}/>
                        <label htmlFor="password_field" className="Registration__label">Пароль</label>
                        <input name="password"
                               className="Registration__input"
                               id="password_field"
                               type="password"
                               value={this.state.password}
                               onChange={(event) => this.regFormChange(event)}/>
                        <button className="Registration__submit-button"
                                type="submit">Создать аккаунт
                        </button>
                    </form>
                </div>
            );
        }
    }
}

export default Registration;
