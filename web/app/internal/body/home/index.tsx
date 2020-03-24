import React from 'react'
import { NavLink} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      home
      <NavLink to='/about/you'>
        go to about
      </NavLink>
    </div>
  )
}

export default Home