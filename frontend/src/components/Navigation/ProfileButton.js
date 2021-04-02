import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";


import * as sessionActions from '../../store/session';





function ProfileButton({ user }) {
const sessionUser = useSelector(state => state.session.user);
const dispatch = useDispatch();
const [showMenu, setShowMenu] = useState(false);

const openMenu = () => {
  if (showMenu) return;
  setShowMenu(true);
}

useEffect(() => {
  if (!showMenu) return;

  const closeMenu = () => {
    setShowMenu(false);
  }

  document.addEventListener('click', closeMenu);

  return () => document.removeEventListener('click', closeMenu);
}, [showMenu])

const logout = (e) => {
  e.preventDefault();
  dispatch(sessionActions.logout());
};

  return (
<div className="navBar">
  <button className="dropDownButton" onClick={openMenu}>
    <i class="fas fa-user"></i>
  </button>
  {showMenu && (
    <ul className='profile-dropdown'>
      <li><NavLink to={`/artist/${sessionUser.id}`} className='yourArtistPageInDropDown'>Your Profile</NavLink></li>
      <li>{user.artistName}</li>
      <li>{user.email}</li>
      <li>
        <button className="dropDownButtonLogOut" onClick={logout}>Log Out</button>
      </li>
    </ul>
  )}
</div>

  )
}

export default ProfileButton;
