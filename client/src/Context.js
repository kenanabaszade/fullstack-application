import React, { Component } from "react";
import Data from "./Data";
import Cookies from "js-cookie";
import { useLastLocation } from 'react-router-last-location';

// Create Context
const Context = React.createContext();

/**
 * Provider component handles user authentication and credentials
 * @namespace Provider
 * @memberof React Component
 */
export class Provider extends Component {
  /**
   * State that stores the authenticated user and credentials.
   * @type {object}
   */
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
    encodedCredentials: Cookies.getJSON("encodedCredentials") || null
  };

  /**
   * Create a new Data instance.
   * @constructor
   * @type {object}
   */
  constructor() {
    super();
    this.data = new Data();
  }

  /**
   * signIn makes a GET request to the API and check if user credentials exists and are correct.
   * @memberof SignIn
   * @method submit
   * @return {Promise} If the data sent is correct, it store user data into state and set cookies. If Throws, return user as null.
   */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      const encodedCredentials = btoa(`${emailAddress}:${password}`);
      this.setState(() => {
        return {
          authenticatedUser: user,
          encodedCredentials
        };
      });
      // Set Cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      Cookies.set("encodedCredentials", JSON.stringify(encodedCredentials), {
        expires: 1
      });
    }
    return user;
  };

  /**
   * signOut cleans state and Cookies.
   * @memberof SignOut
   * @method signOut
   */
  signOut = () => {
    this.setState({
      authenticatedUser: null,
      credentials: null
    });
    Cookies.remove("authenticatedUser");
    Cookies.remove("encodedCredentials");
  };

  /**
   * Render the wrapped children component passing context props to children as value.
   * @memberof Provider
   * @return {string} - JSX element
   */
  render() {
    const { authenticatedUser, encodedCredentials } = this.state;
    const value = {
      authenticatedUser,
      encodedCredentials,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
export default function withContext(Component) {
  return function ContextComponent(props) {
    const lastLocation = useLastLocation();
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} lastLocation={lastLocation}/>}
      </Context.Consumer>
    );
  };
}
