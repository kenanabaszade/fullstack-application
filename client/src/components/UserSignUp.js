import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

/**
 * SignUn component will display form and Submit User information to API request.
 * @namespace SignUp
 * @extends React Component
 */
export default class UserSignUp extends Component {
  /**
   * State that stores the input from user's information.
   * @type {object}
   */
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    passwordConfirmation: "",
    errors: []
  };

  /**
   * change function watches for inputs and stores it in the state.
   * @memberof SignUp
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
   * submit calls createUser function from context Data's instance.
   * @memberof SignUp
   * @method submit
   * @return {Promise} If the data sent is correct, it logs the new user into the app. If Throws, return errors.
   */
  submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      passwordConfirmation
    } = this.state;
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      passwordConfirmation
    };

    context.data
      .createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push("/");
          });
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
   * Render the form to sign up.
   * @memberof SignUp
   * @return {string} - JSX element
   */
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      passwordConfirmation,
      errors
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signup">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={this.change}
                  placeholder="Confirm Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}
