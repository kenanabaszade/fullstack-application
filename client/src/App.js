import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:5000/api/courses")
      .then(response => response.json())

      .then(payload =>
        this.setState({ courses: payload.courses, isLoading: false })
      );
  }

  render() {
    const { courses, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className="App">
          <ul>
            {courses.map(course => (
              <li key={course.id}>
                <h1>{course.title}</h1>
                <p>{course.description}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
