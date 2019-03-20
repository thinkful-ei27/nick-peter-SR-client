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
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    <h2>Ola {this.props.username}!</h2>
                </div>
                <div className="learn-words-container">
                    <WordDisplay word={this.props.word}/>
                    <WordForm />
                    {this.props.answer && <p>this.props.answer</p>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        word: state.words.word,
        answer: state.words.answer
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
