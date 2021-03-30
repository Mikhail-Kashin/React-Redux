import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation ({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  console.log(isLoaded)

  let sessionLinks;
  if (sessionUser){
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className="loggedOutNavBar">
        <NavLink to='./login'>Log In</NavLink>
        <NavLink to='./signup'>Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className="loggedInNavBar">
        {isLoaded && sessionLinks}
        {sessionUser ? <NavLink exact to='/'>Home</NavLink> : null}
    </div>
  )
}

export default Navigation;
