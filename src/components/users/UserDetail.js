import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

export class UserDetail extends Component {
  async componentDidMount() {
    await this.props.fetchUser(this.props.match.params.login);
    await this.props.fetchRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    fetchUser: PropTypes.func.isRequired,
    fetchRepos: PropTypes.func.isRequired,
  };

  render() {
    const {
      login,
      avatar_url,
      location,
      name,
      blog,
      bio,
      html_url,
      company,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;

    const { loading, repos } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return (
      <Fragment>
        <Link className='btn btn-light' to='/'>
          Back to Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              style={{ width: '8.5rem' }}
              alt=''
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a
              href={html_url}
              className='btn btn-dark my-1'
              target='_blank'
              rel='noreferrer'
            >
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username:</strong> {login}
                  </Fragment>
                )}
              </li>

              <li>
                {company && (
                  <Fragment>
                    <strong>Company:</strong> {company}
                  </Fragment>
                )}
              </li>

              <li>
                {blog && (
                  <Fragment>
                    <strong>Website:</strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Public Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
}

export default UserDetail;
