import * as React from 'react';
import { Switch, Route } from 'react-router';
import Article from './Article';
import BlogList from './BlogList';

export default function BlogView() {
  return (
    <Switch>
      <Route path="/blog/*">
        <Article />
      </Route>
      <Route>
        <BlogList />
      </Route>
    </Switch>
  );
}
