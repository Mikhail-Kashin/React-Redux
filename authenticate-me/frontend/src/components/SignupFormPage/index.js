import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Navigation.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return ( <Redirect to='/' />);

  const handleSubmit = (e) => {

    e.preventDefault();
    const errors = setErrors([]);
    return dispatch(sessionActions.signup({ email, username, password, confirmpassword }))
      .catch(async (response) => {
        const signupData = await response.json();
        if (signupData && signupData.errors) setErrors(signupData.errors)
      });

  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((err, idx) => <li key={idx}>{err}</li>)}
      </ul>
      <label>
        Enter Email
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </label>
      <label>
        Enter Username
        <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          required
        />
        </label>
        <button type="submit">Sign Up!</button>
    </form>
  )

}

export default SignupFormPage;
