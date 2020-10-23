import React from 'react';
import css from './SectionsList.css';

import ObjectList from '../ObjectList/ObjectList';


class SectionsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: this.props.isAuthorized,
            categories: [],
        };
        this.upload_category();
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

    render() {
        return (
            <div className="SectionList">
                {this.state.categories.map(category =>
                    <ObjectList header_id={category.id}
                                upload_header_url={`/api/categories/${category.id}`}
                                upload_objects_url={`/api/sections?category_id=${category.id}`}
                                link_below={"/section/"}/>
                )}
            </div>
        );
    }
}

export default SectionsList;
