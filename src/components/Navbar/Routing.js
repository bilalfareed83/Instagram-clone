import React, { useEffect, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from '../../screens/Home';
import Signin from '../../screens/Signin';
import Profile from '../../screens/Profile';
import Signup from '../../screens/Signup';
import CreatePost from '../../screens/CreatePost';
import { UserContext } from '../../App';

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      history.push('/signin');
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/profile" component={Profile} />
      <Route path="/signup" component={Signup} />
      <Route path="/create" component={CreatePost} />
    </Switch>
  );
};

export default Routing;
