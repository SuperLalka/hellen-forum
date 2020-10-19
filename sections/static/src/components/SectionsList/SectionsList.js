import React from 'react';
import css from './SectionsList.css';
import {Link} from "react-router-dom";


class SectionsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            categories: [],
            sections: []
        };
        this.upload_category();
        this.upload_sections();
    }

    upload_category() {
        fetch("/api/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        categories: result
                    });
                },
            )
    }

    upload_sections() {
        fetch("/api/sections")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        sections: result
                    });
                },
            )
    }

    get_section(category) {
        return (
            <li key={category.id} className="SectionList__object">
                <h2 className="SectionList__title">{category.name}</h2>
                <ul className="SectionList__list-items">
                    {this.state.sections.map(section => (section.category === category.id) ?
                        <li key={section.id} className="SectionList__item">
                            <Link to={{pathname: `/section/${section.id}`}}>{section.name}</Link>
                        </li> : null )}
                </ul>
            </li>
        )
    }

    render() {
        return (
            <ol className="SectionList">
                { this.state.categories.map(category => this.get_section(category)) }
            </ol>
        );
    }
}

export default SectionsList;
