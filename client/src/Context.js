import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    encodedCredentials: Cookies.getJSON('encodedCredentials') || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      const encodedCredentials = btoa(`${emailAddress}:${password}`);
      this.setState(() => {
        return {
          authenticatedUser: user,
          encodedCredentials,
        };
      });
      // Set Cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1 })
      Cookies.set('encodedCredentials', JSON.stringify(encodedCredentials), {expires: 1 })
    }
    return user;
  }

  signOut = () => {
    this.setState({
      authenticatedUser: null,
      credentials: null,
    });
    Cookies.remove('authenticatedUser');
    Cookies.remove('encodedCredentials');
  }

  render() {
    const { authenticatedUser, encodedCredentials } = this.state;

    const value = {
      authenticatedUser,
      encodedCredentials,
      data: this.data,
      actions: { // Add the 'actions' property and object
        signIn: this.signIn,
        signOut: this.signOut,
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
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
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
