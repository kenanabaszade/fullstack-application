import React from "react";
import { Link } from "react-router-dom";

/**
 * NotFound component will mount when rendered to the DOM.
 * @namespace NotFound
 * @return {string} JSX element
 */
export default function NotFound() {
  return (
    <div className="bounds-errors">
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <Link className="button button-secondary" to={"/"}>
        Go back
      </Link>
    </div>
  );
}
