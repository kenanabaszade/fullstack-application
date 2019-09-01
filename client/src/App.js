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

import withContext from './Context';

const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);

export default () => {
  return (
    <BrowserRouter>
    <div>
      <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/create" component={CreateCourse} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/signup" component={UserSignUp} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};
