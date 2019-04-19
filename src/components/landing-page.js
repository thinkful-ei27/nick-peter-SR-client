import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logoutBoolFalse} from '../actions/auth';
import LoginForm from './login-form';
import './landing-page.css';

export class LandingPage extends React.Component {
    
  
  detectClick() {
    this.props.dispatch(logoutBoolFalse())
  }
  
  render() {
    // If we are logged in redirect straight to the user's dashboard
      if (this.props.loggedIn) {
          return <Redirect to="/dashboard" />;
      }

    return (
      <div onClick={() => this.detectClick()} role="main" className="homeContainer">
        <div className="home">
            <LoginForm role="form"/>
            <p>New Users:</p>
            <Link className='linkToRegister' to="/register">Register</Link>
        </div>
        <div className="informercial">
          <h2>Learn Portuguese the RIGHT Way</h2>
          <p className="blurb">
            <strong>Portuguese Palavras</strong> is a web app for <strong>ANYONE</strong> who wants to learn the Portuguese language. 
             Portuguese Palavras tests you on words and saves the result. Utilizing that data, it runs
            the words through a <strong>spaced repetition algorithm</strong> to ensure you see words you don't know more
            and words you do less. Click on the <strong>Register Link</strong> to learn South America's most popular language today!
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
