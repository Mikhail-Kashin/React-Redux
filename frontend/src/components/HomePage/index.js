import { NavLink } from 'react-router-dom'
import './HomePage.css'




function HomePage() {

  return (
    <div>
    <p className="title">Welcome To  The Symphonic Campaign</p>
    <p className="HomeLinks">
      <NavLink to='/artist'>Artists</NavLink>
      <NavLink to='/album'>Albums</NavLink>
      <NavLink to='/track'>Tracks</NavLink>
    </p>
    <div className="splashDiv">
      <p className="splashPic"></p>
    </div>

    </div>
  )
}

export default HomePage
