import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import WordDisplay from './word-display';
import { getWord } from '../actions/words'; 
import WordForm from './word-form';
import Progress from './progress';
import './dashboard.css';
export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(getWord());
    }

    render() {
        const { answer, username, word, next } = this.props;

        let feedback;
        if (answer) {
            feedback = <p>{answer}</p>
        }
        return (
            <main className="dashboard">
                <section className="dashboard-username">
                    <h2>Olá, {username}!</h2>
                </section>
                <section className="learn-words-container">
                    <WordDisplay word={word}/>
                    <Progress next={next}/>
                    <WordForm next={next}/>
                    {feedback}
                </section>
            </main>
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
