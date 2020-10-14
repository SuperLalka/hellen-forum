import React from 'react';
import { Link } from 'react-router-dom'
import css from './SubSections.css';


class SubSections extends React.Component {

    constructor(props) {
        super(props);
        this.section_id = this.props.match.params.section_id
        this.state = {
            error: null,
            isLoaded: false,
            section: [],
            subsections: []
        };
        this.upload_section();
        this.upload_subsections();
    }

    upload_section() {
        fetch(`/api/section/${this.section_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        section: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    upload_subsections() {
        fetch(`/api/subsections?section_id=${this.section_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        subsections: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div className="SubSections__object">
                <h2 className="SubSections__title">{this.state.section.name}</h2>
                <ul className="SubSections__list-items">
                    {this.state.subsections.map(subsection => (
                        <li key={subsection.id} className="SubSections__item">
                            <Link to={`/section/subsection/${subsection.id}`}>{subsection.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default SubSections;
