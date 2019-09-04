// Stateless
import React from "react";
import { Redirect } from "react-router-dom";

/**
 * SignOut anonymous function
 * @param context Calls signOut method from context component
 * @returns JSX Element - redirect user to main page.
 */
export default ({ context }) => {
  context.actions.signOut();

  return <Redirect to="/" />;
};
