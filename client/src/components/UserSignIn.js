import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

/**
 * SignIn component will display form and Submit User credentials to API request.
 * @namespace SignIn
 * @extends React Component
 */
export default class SignIn extends Component {
  /**
   * State that stores the input from user's credentials.
   * @type {object}
   */
  state = {
    emailAddress: "",
    password: "",
    errors: []
  };

  /**
   * change function watches for inputs and stores it in the state.
   * @memberof SignIn
   * @method change
   * @param event input element in the DOM.
   */
  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  /**
   * submit calls signIn function from context Data's instance.
   * @memberof SignIn
   * @method submit
   * @return {Promise} If credentials is correct, it returns user data. If Throws, return null.
   */
  submit = () => {
    let redirect;
    if (this.props.lastLocation) {
      redirect = { from: { pathname: this.props.lastLocation["pathname"] } };
    } else {
      redirect = { from: { pathname: "/" } };
    }
    const { context } = this.props;
    const { from } = this.props.location.state || redirect;
    const { emailAddress, password } = this.state;
    context.actions
      .signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  /**
   * cancel method takes the user back to home page.
   * @memberof SignIn
   * @method cancel
   */
  cancel = () => {
    this.props.history.push("/");
  };

  /**
   * Render the form to log in.
   * @memberof SignIn
   * @return {string} - JSX element
   */
  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Log In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  placeholder="Email Address"
                  value={emailAddress}
                  onChange={this.change}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.change}
                />
              </React.Fragment>
            )}
          />
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
}
