import React from 'react';
import {connect} from 'react-redux';
import {clearAuth, logoutSuccess} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './header-bar.css';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        this.props.dispatch(logoutSuccess());
        clearAuthToken();

    }

    render() {
        // Only render the log out button if we are logged in
        let logOutSuccess;
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()} className="logout-button">Log out</button>
            );
        }

        if (this.props.didLogout) {
            logOutSuccess = (
                <div role="alert" className="logout-success">
                    <p>Successfully logged out!</p>
                </div>
            )
        }


        return (
            <header role="banner" className="header-bar">
                <h1>Portuguese Palavras</h1>
                {logOutButton}
                {logOutSuccess}
            </header>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    didLogout: state.auth.didLogout
});

export default connect(mapStateToProps)(HeaderBar);
