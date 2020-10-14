import React from 'react';
import { Link } from 'react-router-dom'
import css from './Topics.css';


class Topics extends React.Component {

    constructor(props) {
        super(props);
        this.subsection = {
            id: 1, text: "ПОДРаздел подробнее"
        }
        this.topics = [
            {id: 1, text: 'Тема 1'},
            {id: 2, text: 'Тема 2'},
            {id: 3, text: 'Тема 3'},
            {id: 4, text: 'Тема 4'},
            {id: 5, text: 'Тема 5'},
            {id: 6, text: 'Тема 6'},
            {id: 7, text: 'Тема 7'},
            {id: 8, text: 'Тема 8'},
        ];
    }

    render() {
        return (
            <div className="Topics__object">
                <h2 className="Topics__title">{this.subsection.text}</h2>
                <ul className="Topics__list-items">
                    {this.topics.map(item => (
                        <li key={item.id} className="Topics__item">
                            <Link to={`/section/subsection/topics/${item.id}`}>{item.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Topics;
