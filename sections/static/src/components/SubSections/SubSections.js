import React from 'react';
import { Link } from 'react-router-dom'
import css from './SubSections.css';


class SubSections extends React.Component {

    constructor(props) {
        super(props);
        this.section_id = this.props.match.params.section_id
        this.state = [];
        this.section = {
            id: 1, text: "Раздел подробнее"
        }
        this.subsections = [
            {id: 1, text: 'Подраздел 1'},
            {id: 2, text: 'Подраздел 2'},
            {id: 3, text: 'Подраздел 3'},
            {id: 4, text: 'Подраздел 4'},
            {id: 5, text: 'Подраздел 5'},
        ];
    }

    render() {
        return (
            <div className="SubSections__object">
                <h2 className="SubSections__title">{this.section.text}</h2>
                <ul className="SubSections__list-items">
                    {this.subsections.map(item => (
                        <li key={item.id} className="SubSections__item">
                            <Link to={`/section/subsection/${item.id}`}>{item.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default SubSections;
