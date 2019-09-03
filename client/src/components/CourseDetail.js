import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import config from "../config";

export default class CourseDetail extends Component {
  state = {
    course: [],
    user: []
  };

  componentDidMount() {
    const id = this.props.location.pathname;
    axios
      .get(`${config.apiBaseUrl}${id}`)
      .then(res => {
        const course = res.data.course;
        const user = res.data.course.User;
        this.setState({
          course,
          user
        });
      })
      .catch(err => {
        if (err.response.status === 500) {
          this.props.history.push("/notfound");
        } else {
          // Handle  rejected Promises
          console.log(err);
          this.props.history.push("/error");
        }
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (
      window.confirm("Are you sure you want to permanently delete this course?")
    ) {
      this.submit();
    } else {
      return false;
    }
  };

  submit = () => {
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

  render() {
    const { course, user } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {authUser && authUser.user.id === user.id ? (
                <span>
                  <Link className="button" to={`/courses/${course.id}/update`}>
                    Update Course
                  </Link>
                  <button className="button" onClick={this.handleSubmit}>
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
      </div>
    );
  }
}
