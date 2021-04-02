import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation ({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // console.log(isLoaded)

  let sessionLinks;
  if (sessionUser){
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className="loggedOutNavBar">
        <p>
        <NavLink to='/login'>Log In</NavLink>
        </p>
        <NavLink to='/signup'>Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className="loggedInNavBar">
        <NavLink className="navHomeButton" id="home" exact to='/'><img className="logoHome" src="https://user-images.githubusercontent.com/75585372/113439832-49b89b00-93b9-11eb-9670-5738be8fc0a1.png"></img></NavLink>
        {sessionLinks}
    </div>
  )
}

export default Navigation;
