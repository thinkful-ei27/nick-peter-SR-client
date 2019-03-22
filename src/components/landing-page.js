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
            <p>For New Users:</p>
            <Link to="/register">Register</Link>
            <label>For Confused Users:</label>
            <button className="faqButton">FAQ</button>
        </div>
        <div className="informercial">
          <h2>Learn Portuguese the RIGHT Way</h2>
          <p>Portugueuse Palavras uses Spaced Reptition,</p>
          <p>focusing on what you don't know and not wasting</p>
          <p>time with what you do. Click on the Register link</p>
          <p>to learn South America's Most Popular Language today!</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
