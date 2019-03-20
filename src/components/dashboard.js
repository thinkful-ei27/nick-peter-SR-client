import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import WordDisplay from './word-display';
import { getWord } from '../actions/words'; 
import WordForm from './word-form';
import {Link, Redirect} from 'react-router-dom';
import './dashboard.css';
export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(getWord());
    }

    render() {
        const { answer, username, word } = this.props;

        let feedback;
        if (answer) {
            feedback = <p>{answer}</p>
        }
        let nextButton;
        if(this.props.next){
          nextButton = <button className = "next-button">Next</button>
        }
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    <h2>Ola {username}!</h2>
                </div>
                <div className="learn-words-container">
                    <WordDisplay word={word}/>
                    <WordForm />
                    {feedback}
                    {nextButton}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: currentUser.username,
        word: state.words.word,
        answer: state.words.answer,
        next: state.words.next
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
