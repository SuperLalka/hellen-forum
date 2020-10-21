import React from 'react';
import css from './CreateTopicForm.css';


class CreateTopicForm extends React.Component {
    constructor(props) {
        super(props);
        this.subsection_id = this.props.subsection_id;
        this.state = {
            openCommentInput: false,
            topic_name: '',
            topic_text: '',
        };
    }

    topicCreateFormChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value
        });
    }

    topicCreateFormSubmit(event) {
        event.preventDefault();

        fetch("/api/topics", {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                'name': this.state.topic_name,
                'text': this.state.topic_text,
                'subsection_id': this.subsection_id,
                'user_id': localStorage['user_id'],
            })
        })
            .then(() => {
                    this.setState({
                        topic_name: '',
                        topic_text: '',
                    });
                    this.props.refreshComponent();
                    this.topicCreateFormToggle();
                }
            )
    }

    topicCreateFormToggle() {
        this.setState(currentState => ({
            openCreateInput: !currentState.openCreateInput
        }));
    }

    render() {
        return (
            <div className="Topics__underlist-block">
                {this.state.openCreateInput
                    ? <form className="Topics__create-topic-form" id="create-topic_form"
                            onSubmit={(event) => this.topicCreateFormSubmit(event)}>
                        <input name="topic_name"
                               className="Topics__input"
                               id="topicname_field"
                               type="text"
                               value={this.state.topic_name}
                               onChange={(event) => this.topicCreateFormChange(event)}
                               placeholder="Название темы"/>
                        <textarea name="topic_text"
                                  className="Topics__input_textarea"
                                  id="topictext_field"
                                  value={this.state.topic_text}
                                  onChange={(event) => this.topicCreateFormChange(event)}
                                  placeholder="Текст до 1000 знаков"/>
                        <div className="Topics__buttons-block">
                            <button className="Topics__submit-button" type="submit">Создать</button>
                            <button className="Topics__cancelling-button" type="button"
                                    onClick={() => this.topicCreateFormToggle()}>Отмена</button>
                        </div>
                    </form>
                    : <button className="Topics__create-topic-button" type="button"
                              onClick={() => this.topicCreateFormToggle()}>Создать новую тему</button>}
            </div>
        );
    }
}

export default CreateTopicForm;
