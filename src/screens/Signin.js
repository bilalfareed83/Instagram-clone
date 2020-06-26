import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../App';
import { reducer } from '../reducers/userReducer';

const Signin = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { state, dispatch } = useContext(UserContext);

  const postData = async () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'Invalid email', classes: '#e53935 red darken-1' });
      return;
    }

    await fetch('/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#e53935 red darken-1' });
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.findUser));
          dispatch({ type: 'USER', payload: data.findUser });

          M.toast({
            html: 'Signin successfully',
            classes: '#2e7d32 green darken-3',
          });

          history.push('/');
        }
      });
  };
  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password.toString()}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #42a5f5 blue lighten-1"
          type="submit"
          onClick={postData}
        >
          Singin
        </button>
        <h5>
          <Link to="/signup">Do you have an account?</Link>
        </h5>
      </div>
    </div>
  );
};
export default Signin;
