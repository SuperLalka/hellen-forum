import React from 'react';
import css from './SectionsList.css';
import {Link} from "react-router-dom";


class SectionsList extends React.Component {

    constructor(props) {
        super(props);
        this.categories = [
            {id: 1, text: 'category_1'},
            {id: 2, text: 'category_2'},
            {id: 3, text: 'category_3'}
        ];
        this.sections = [
            {category: 1, id: 1, text: 'Раздел 1'},
            {category: 1, id: 2, text: 'Раздел 2'},
            {category: 2, id: 3, text: 'Раздел 3'},
            {category: 2, id: 4, text: 'Раздел 4'},
            {category: 2, id: 5, text: 'Раздел 5'},
            {category: 3, id: 6, text: 'Раздел 6'},
            {category: 3, id: 7, text: 'Раздел 7'}
        ];
    }

    get_section(category) {
        return (
            <li key={category.id} className="SectionList__object">
                <h2 className="SectionList__title">{category.text}</h2>
                <ul className="SectionList__list-items">
                    {this.sections.map(section => (section.category === category.id) ?
                        <li key={section.id} className="SectionList__item">
                            <Link to={{pathname: `/section/${section.id}`}}>{section.text}</Link>
                        </li> : "")}
                </ul>
            </li>
        )
    }

    render() {
        return (
            <ol className="SectionList">
                {this.categories.map(category =>
                    this.get_section(category))}
            </ol>
        );
    }
}

export default SectionsList;
