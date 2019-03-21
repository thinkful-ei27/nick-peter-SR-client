import React from 'react';
import {reset, Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import { sendAnswer, getWord } from '../actions/words'

export class WordForm extends React.Component {
    onSubmit(value) {
        const { userAnswer } = value
        const { dispatch } = this.props
        return dispatch(sendAnswer(userAnswer)).then(() => dispatch(reset('word-form')))
    }

    onClick(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        return dispatch(getWord());
    }

    required(value){
        return value ? undefined : 'Must submit an answer';
    }

    render() {
        let submitButton;
        let nextButton;
        if(this.props.next){
          nextButton = <button onClick={(e) => this.onClick(e)} className="next-button">Next</button>
        } else {
          submitButton = <button 
            className="submit-word"
            type="submit"
            disabled={this.props.pristine || this.props.submitting}>
            Check My Answer
         </button>
        }

       


        return (
            <div>
              <form
                  className="word-form"
                  onSubmit={this.props.handleSubmit(values =>
                      this.onSubmit(values)
                  )}>
                  <label className="input-label" htmlFor="userAnswer">Your Answer:</label>
                  <Field
                      validate={[this.required]}
                      component={Input}
                      type="text"
                      name="userAnswer"
                  />
                {submitButton}
              </form>
              {nextButton}
            </div>
        );
    }
}




export default reduxForm({
    form: 'word-form',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('word-form', Object.keys(errors)[0]))
    // onSubmitSuccess: (dispatch) =>
    //     dispatch(reset('word-form'))
})(WordForm);
