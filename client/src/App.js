import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';


export default () => {
  return (
    <BrowserRouter>
    <div>
      <Header />
        <Switch>
          <Route exact path="/courses" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/courses/create" component={CreateCourse} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signout" component={UserSignOut} />
          <Route path="/signup" component={UserSignUp} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};
