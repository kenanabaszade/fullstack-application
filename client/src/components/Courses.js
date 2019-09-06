import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Courses component will mount all courses to the main page.
 * @namespace Courses
 * @extends React Component
 */
export default class Courses extends Component {
  /**
   * State that stores all courses from the API request.
   * @type {object}
   */
  state = {
    courses: [],
    isLoading: false
  };

  /**
   * componentDidMount fetch the data from API and stores it into state's object.
   * @memberof Courses
   * @method componentDidMount
   */
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    fetch(`${config.apiBaseUrl}/courses`)
      .then(res => res.json())
      .then(payload => {
        const courses = payload.courses;
        this.setState({
          courses,
          isLoading: false
        });
      })
      .catch(err => {
        // Handle  rejected Promises
        console.log(err);
        this.props.history.push("/error");
      });
  }

  /**
   * Render the Course's card to the DOM.
   * @memberof Courses
   * @return {string} - JSX element
   */
  render() {
    const { courses, isLoading } = this.state;

    return (
      <div className="bounds">
        {isLoading ? (
          <div className="loading">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <React.Fragment>
            {courses.map(course => (
              <div key={course.id} className="grid-33">
                <Link
                  className="course--module course--link"
                  to={`courses/${course.id}`}
                >
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </Link>
              </div>
            ))}
            <div className="grid-33">
              <Link
                className="course--module course--add--module"
                to={"/courses/create"}
              >
                <h3 className="course--add--title">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 13 13"
                    className="add"
                  >
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                  </svg>
                  New Course
                </h3>
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
