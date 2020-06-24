import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const Navbar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  console.log(state);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create-Post</Link>
        </li>,
        <li>
          <button
            onClick={() => {
              localStorage.clear();
              history.push('/signin');
            }}
            className="btn waves-effect waves-light #42a5f5 blue lighten-1"
            type="submit"
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/signin">Signin</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link
          to={state ? '/' : '/signin'}
          className="brand-logo"
          style={{ paddingLeft: '10px' }}
        >
          Instagram
        </Link>
        <ul
          id="nav-mobile"
          className="right hide-on-med-and-down"
          style={{ paddingRight: '10px' }}
        >
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
