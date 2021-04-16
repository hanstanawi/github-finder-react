import { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import UserDetail from './components/users/UserDetail';
import SearchBar from './components/users/SearchBar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  searchUsers = async (query) => {
    try {
      this.setState({ loading: true });
      const res = await axios.get(
        `https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ users: res.data.items });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchUser = async (username) => {
    try {
      this.setState({ loading: true });
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ user: res.data });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchUserRepos = async (username) => {
    try {
      this.setState({ loading: true });
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ repos: res.data });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (message, alertType) => {
    this.setState({
      alert: { message, alertType },
    });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, alert, user, repos } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <SearchBar
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={!!users.length}
                      setAlert={this.setAlert}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <UserDetail
                    {...props}
                    fetchUser={this.fetchUser}
                    fetchRepos={this.fetchUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
