import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';

function Navigation ({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser){
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to='./login'>Log In</NavLink>
        <NavLink to='./signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        {isLoaded && sessionLinks}
        <NavLink exact to='/'>Home</NavLink>
      </li>
    </ul>
  )
}

export default Navigation;
