import React from "react";
import { Link } from "react-router-dom";

/**
 * Forbidden component will mount when rendered to the DOM.
 * @namespace Forbidden
 * @return {string} JSX element
 */
export default function Forbidden() {
  return (
    <div className="bounds-errors">
      <h1>Forbidden</h1>
      <p>Oh oh! You can't access this page.</p>
      <Link className="button button-secondary" to={"/"}>
        Go back
      </Link>
    </div>
  );
}
