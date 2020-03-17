import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

const About = () => {
  const { profile } = useParams()
  return (
    <div>
      about {profile}
      <NavLink to='/'>
        go back home
      </NavLink>
    </div>
  )
}

export default About