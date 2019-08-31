import React from "react";
import { Link } from "react-router-dom";

export default function Header () {
  return (
    <React.Fragment>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            <React.Fragment>
            <Link className="signup" to="sign-up.html">Sign Up</Link>
            <Link className="signin" to="sign-in.html">Sign In</Link>
            </React.Fragment>
          </nav>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  )
};