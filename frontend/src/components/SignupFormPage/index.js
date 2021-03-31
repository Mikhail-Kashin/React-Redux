import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './SignupForm.css';



function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [artistName, setArtistName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return ( <Redirect to='/' />);

  const handleSubmit = (e) => {

    e.preventDefault();
    const errors = setErrors([]);
    return dispatch(sessionActions.signup({ email, artistName, password, confirmpassword }))
      .catch(async (response) => {
        const signupData = await response.json();
        if (signupData && signupData.errors) setErrors(signupData.errors)
      });

  }

  return (
    <form onSubmit={handleSubmit} className='SignupFormPage'>
      <ul>
        {errors.map((err, idx) => <li key={idx}>{err}</li>)}
      </ul>
      <label className='emailSignup'>
        Email
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Email'
          />
      </label>
      <label className='UsernameSignup'>
        artistName
        <input
        type='text'
        placeholder='artistName'
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        required
        />
      </label>
      <label className='passwordSignup'>
        Password
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className='confirmPasswordSignup'>
        Confirm Password
        <input
          type="password"
          placeholder='Confirm Password'
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          required
        />
        </label >
        <button type="submit" className='buttonSignup'>Sign Up!</button>
    </form>
  )

}

export default SignupFormPage;
