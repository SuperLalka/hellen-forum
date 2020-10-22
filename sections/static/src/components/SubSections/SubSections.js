import React from 'react';

import ObjectList from "../ObjectList/ObjectList";

import css from './SubSections.css';


class SubSections extends React.Component {

    constructor(props) {
        super(props);
        this.section_id = this.props.match.params.section_id;
        this.state = {
            isAuthorized: this.props.isAuthorized,
        }
    }

    render() {
        return (
            <ObjectList header_id={this.section_id}
                        upload_header_url={`/api/section/${this.section_id}`}
                        upload_objects_url={`/api/subsections?section_id=${this.section_id}`}
                        link_below={"/section/subsection/"}/>
        );
    }
}

export default SubSections;
