import React, { Component } from "react";
import Form from "./Form";

/**
 * CreateCourse component will display form and Submit course to API request.
 * @namespace CreateCourse
 * @extends React Component
 */
export default class CreateCourse extends Component {
  /**
   * State that stores the input from course's creater.
   * @type {object}
   */
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: []
  };

  /**
   * change function watches for input and stores it in the state.
   * @memberof CreateCourse
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
   * submit calls createCourse function from context Data's instance.
   * @memberof CreateCourse
   * @method submit
   */
  submit = () => {
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
      .createCourse(course, encodedCredentials)
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
   * cancel method takes the user back to home page.
   * @memberof CreateCourse
   * @method cancel
   */
  cancel = () => {
    this.props.history.push("/");
  };

  /**
   * Render the necessary form to create a new course.
   * @memberof CreateCourse
   * @return {string} - JSX element
   */
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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
    );
  }
}
