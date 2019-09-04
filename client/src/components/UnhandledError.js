import React from "react";
import { Link } from "react-router-dom";

/**
 * UnhandledError component will mount when rendered to the DOM.
 * @namespace UnhandledError
 * @return {string} JSX element
 */
export default function UnhandledError() {
  return (
    <div className="bounds-errors">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      <Link className="button button-secondary" to={"/"}>
        Go Back
      </Link>
    </div>
  );
}
