import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import { sendAnswer } from '../actions/words'

export class WordForm extends React.Component {
    onSubmit(value) {
        const { userAnswer } = value
        const { dispatch } = this.props
        return dispatch(sendAnswer(userAnswer))
    }

    render() {
        return (
            <form
                className="word-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="userAnswer">Your Answer:</label>
                <Field
                    component={Input}
                    type="text"
                    name="userAnswer"
                />
                <button 
                    className="submitWord"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Check My Answer
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'word-form',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('word-form', Object.keys(errors)[0]))
})(WordForm);
