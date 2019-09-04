import config from "./config";

/**
 * Data class handles Requests to the API
 * @namespace Data
 */
export default class Data {
  /**
   * api takes paraments to build the header and body of the API request and fetch the data as requested.
   * @method api
   * @param {string} path
   * @param {string} method
   * @param {string} body
   * @param {boolean} requiresAuth
   * @param {string} credentials
   * @param {string } encondedCredentials
   * @return {function} fetch
   */
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = null,
    credentials = null,
    encodedCredentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth && encodedCredentials === null) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    } else if (requiresAuth && encodedCredentials) {
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  /**
   * getUser makes a GET request to the API to store the new user to the database.
   * @memberof Data
   * @method getUser
   * @param {string} - emailAddress and password
   * @return {Promise} If the data sent is correct, it logs the new user into the app. If Throws, return errors.
   */
  async getUser(emailAddress, password) {
    const response = await this.api(
      `/users`,
      "GET",
      null,
      true,
      { emailAddress, password },
      null
    );
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * createUser makes a POST request to the API to create a new user.
   * @memberof Data
   * @method createUser
   * @param {object} user
   * @return {Promise} If the data sent is correct, return no content. If Throws, return errors.
   */
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * createCourse makes a POST request to the API to create a new course.
   * @memberof Data
   * @method createCourse
   * @param {object} course
   * @param {string} encodedCredentials
   * @return {Promise} If the data sent is correct, it creates new course in the database. If Throws, return errors.
   */
  async createCourse(course, encodedCredentials) {
    const response = await this.api(
      "/courses",
      "POST",
      course,
      true,
      null,
      encodedCredentials
    );
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * updateCourse makes a PUT request to the API to update an existing course.
   * @memberof Data
   * @method updateCourse
   * @param {string} id - current course ID.
   * @param {object} course
   * @param {string} encodedCredentials
   * @return {Promise} If the data sent is correct, it updates the course in the database. If Throws, return errors.
   */
  async uptadeCourse(id, course, encodedCredentials) {
    const response = await this.api(
      `/courses/${id}`,
      "PUT",
      course,
      true,
      null,
      encodedCredentials
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * deleteCourse makes a DELETE request to the API to delete an existing course.
   * @memberof Data
   * @method deleteCourse
   * @param {string} id - current course ID.
   * @param {string} encodedCredentials
   * @return {Promise} If the data sent is correct, it deletes the course in the database. If Throws, return errors.
   */
  async deleteCourse(id, encodedCredentials) {
    const response = await this.api(
      `/courses/${id}`,
      "DELETE",
      null,
      true,
      null,
      encodedCredentials
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    } else {
      throw new Error();
    }
  }
}
