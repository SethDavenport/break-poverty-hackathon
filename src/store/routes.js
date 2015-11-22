import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import LoginPage from '../containers/LoginPage';
import PersonEntryForm from '../containers/PersonEntryForm';
import PeopleList from '../containers/PeopleList';

export default (
  <Router>
    <Route path="/">
      <IndexRoute component={ PeopleList } />
      <Route path="/login" component={ LoginPage } />
      <Route path="/people" component={ PeopleList } />
      <Route path="/person/add" component={ PersonEntryForm } />
    </Route>
  </Router>
);
