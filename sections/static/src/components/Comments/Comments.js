import React from 'react';
import css from './Comments.css';
import {Link} from "react-router-dom";


class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.topic = {
            id: 1, text: "Тема подробнее"
        }
        this.comments_list = [
            {id: 1, text: 'Комментарий 1'},
            {id: 2, text: 'Комментарий 2'},
            {id: 3, text: 'Комментарий 3'},
            {id: 4, text: 'Комментарий 4'},
            {id: 5, text: 'Комментарий 5'},
            {id: 6, text: 'Комментарий 6'},
            {id: 7, text: 'Комментарий 7'},
            {id: 8, text: 'Комментарий 8'},
        ];
    }

    render() {
        return (
            <div className="Comments">
                <h2 className="Comments__title">{this.topic.text}</h2>
                <ul className="Comments__list-items">
                    {this.comments_list.map(item => (
                        <li key={item.id} className="Comments__item">
                            <div className="Comments__item-text">
                                <p>{item.text}</p>
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
