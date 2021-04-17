import React, { Fragment } from 'react';
import SearchBar from '../users/SearchBar';
import Users from '../users/Users';

const Home = () => (
  <Fragment>
    <SearchBar />
    <Users />
  </Fragment>
);

export default Home;
