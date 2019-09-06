import React, { Component } from "react";
import config from "../config";
import Form from "./Form";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * UpdateCourse component will display form and Submit Updates to API request.
 * @namespace UpdateCourse
 * @extends React Component
 */
export default class UpdateCourse extends Component {
  /**
   * State that stores the input from course's updates.
   * @type {object}
   */
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
    isLoading: false
  };

  /**
   * componentDidMount fetch the data from API and stores it into state's object.
   * If the logged User does not own the course requested, it will be redirect to forbidden page.
   * @memberof CourseUpdate
   * @method componentDidMount
   */
  componentDidMount() {
    this.setState({
      isLoading: true
    });

    const { context } = this.props;
    const user = context.authenticatedUser;
    const id = this.props.match.params.id;

    fetch(`${config.apiBaseUrl}/courses/${id}`)
      .then(res => res.json())
      .then(payload => {
        const course = payload.course;
        if (course.userId !== user.user.id) {
          this.props.history.push("/forbidden");
        } else {
          this.setState({
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            isLoading: false
          });
        }
      })
      .catch(err => {
        // Handle  rejected Promises
        console.log(err);
        this.props.history.push("/notfound");
      });
  }

  /**
   * change function watches for inputs and stores it in the state.
   * @memberof UpdateCourse
   * @method change
   * @param event input element in the DOM.
   */
  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  /**
   * submit calls updateCourse function from context Data's instance.
   * @memberof UpdateCourse
   * @method submit
   */
  submit = () => {
    const id = this.props.match.params.id;
    const { context } = this.props;
    const encodedCredentials = context.encodedCredentials;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    context.data
      .uptadeCourse(id, course, encodedCredentials)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push(`/courses/${id}`);
        }
      })
      .catch(err => {
        // Handle  rejected Promises
        console.log(err);
        this.props.history.push("/error");
      });
  };

  /**
   * cancel method takes the user back to home page.
   * @memberof CreateCourse
   * @method cancel
   */
  cancel = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/courses/${id}`);
  };

  /**
   * Render the current course details as placeholders of a form.
   * The changes made in each input will be the changes made in the course.
   * @memberof UpdateCourse
   * @return {string} - JSX element
   */
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      isLoading
    } = this.state;

    return (
      <React.Fragment>
        {isLoading ? (
          <div className="loading">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Course"
                elements={() => (
                  <React.Fragment>
                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            className="input-title course--title--input"
                            placeholder="Course title..."
                            onChange={this.change}
                            value={title}
                          />
                        </div>
                        <p>By Joe Smith</p>
                      </div>
                      <div className="course--description">
                        <div>
                          <textarea
                            id="description"
                            name="description"
                            className=""
                            placeholder="Course description..."
                            onChange={this.change}
                            value={description}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="grid-25 grid-right">
                      <div className="course--stats">
                        <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                              <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                className="course--time--input"
                                placeholder="Hours"
                                onChange={this.change}
                                value={estimatedTime}
                              />
                            </div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                              <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                className=""
                                placeholder="List materials..."
                                onChange={this.change}
                                value={materialsNeeded}
                              ></textarea>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
