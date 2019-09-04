import React from "react";
import { Link } from "react-router-dom";

/**
 * Header component will mount the header of the application according to the user status.
 * @namespace Header
 * @extends React PureComponent
 */
export default class Header extends React.PureComponent {
  /**
   * Render the Header to the DOM.
   * If the user is not logged, It displays Login and Sign Up button.
   * Else will display user first name with sign out button.
   * @memberof Header
   * @return {string} - JSX element
   */
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <React.Fragment>
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
              {authUser ? (
                <React.Fragment>
                  <span>Welcome, {authUser.user.firstName}!</span>
                  <Link className="signout" to={"/signout"}>
                    Log Out
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link className="signup" to={"/signup"}>
                    Sign Up
                  </Link>
                  <Link className="signin" to={"/signin"}>
                    Log In
                  </Link>
                </React.Fragment>
              )}
            </nav>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}
