import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import config from "../config";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * CourseDetail component will mount a specific course to the details page.
 * @namespace CourseDetail
 * @extends React Component
 */
export default class CourseDetail extends Component {
  /**
   * State that stores the course and the course's owner.
   * @type {object}
   */
  state = {
    course: [],
    user: [],
    isLoading: false
  };

  /**
   * componentDidMount fetch the data from API and stores it into state's object.
   * @memberof CourseDetail
   * @method componentDidMount
   */
  componentDidMount() {
    this.setState({
      isLoading: true
    });

    const id = this.props.location.pathname;
    fetch(`${config.apiBaseUrl}${id}`)
      .then(res => res.json())
      .then(payload => {
        const course = payload.course;
        const user = payload.course.User;
        this.setState({
          course,
          user,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/notfound");
      });
  }

  /**
   * handleSubmit handles the DELETE course.
   * @memberof CourseDetail
   * @method handleSubmit
   * @param event Clicked element in the DOM.
   */
  handleDelete = event => {
    event.preventDefault();
    if (
      window.confirm("Are you sure you want to permanently delete this course?")
    ) {
      this.deleteCourse();
    } else {
      return false;
    }
  };

  /**
   * deleteCourse calls DELETE method to the API.
   * @memberof CourseDetail
   * @method deleteCourse
   */
  deleteCourse = () => {
    const id = this.props.match.params.id;
    const { context } = this.props;
    const encodedCredentials = context.encodedCredentials;

    context.data
      .deleteCourse(id, encodedCredentials)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        // Handle  rejected Promises
        console.log(err);
        this.props.history.push("/error");
      });
  };

  /**
   * Render the Course Details to the DOM.
   * If there requested exists it will display all details.
   * Else will render NotFound component.
   * @memberof CourseDetail
   * @return {string} - JSX element
   */
  render() {
    const { course, user, isLoading } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div>
        {isLoading ? (
          <div className="loading">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <React.Fragment>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {authUser && authUser.user.id === user.id ? (
                    <span>
                      <Link
                        className="button"
                        to={`/courses/${course.id}/update`}
                      >
                        Update Course
                      </Link>
                      <button
                        className="button button-tertiary"
                        onClick={this.handleDelete}
                      >
                        Delete Course
                      </button>
                    </span>
                  ) : null}
                  <Link className="button button-secondary" to={"/"}>
                    Return to List
                  </Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>
                    By {user.firstName} {user.lastName}
                  </p>
                </div>
                <div className="course--description">
                  <ReactMarkdown source={course.description} />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ReactMarkdown source={course.materialsNeeded} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
