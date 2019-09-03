import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = null, credentials = null, encodedCredentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if(requiresAuth && encodedCredentials === null) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    } else if(requiresAuth && encodedCredentials) {
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }



    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password }, null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  async createCourse(course, encodedCredentials) {
    const response = await this.api('/courses', 'POST', course, true, null, encodedCredentials);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  async uptadeCourse(id, course, encodedCredentials) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, null, encodedCredentials);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse(id, encodedCredentials) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, null, encodedCredentials);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }
}
