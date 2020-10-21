import React from 'react';
import {Link} from 'react-router-dom'
import css from './ObjectList.css';


class ObjectList extends React.Component {

    constructor(props) {
        super(props);
        this.header_id = this.props.header_id;
        this.state = {
            header: {},
            objects: []
        };
        this.upload_header();
    }

    upload_header() {
        fetch(this.props.upload_header_url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        header: result
                    });
                    this.upload_objects();
                },
            )
    }

    upload_objects() {
        fetch(this.props.upload_objects_url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        objects: result
                    });
                },
            )
    }

    render() {
        return (
            <div className="ObjectList__object">
                <h2 className="ObjectList__title">{this.state.header.name}</h2>
                <ul className="ObjectList__list-items">
                    {this.state.objects.map(object =>
                        <li key={object.id} className="ObjectList__item">
                            <Link to={{pathname: this.props.link_below + object.id}}>{object.name}</Link>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default ObjectList;
