import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const App = () => {
  let element = useRoutes([
    { path: '/', element: <Locations /> },
    { path: '/stitchandsip', element: <LocationEvents index={1} /> },
    { path: '/brooklynyarn', element: <LocationEvents index={2} /> },
    { path: '/harlemcraft', element: <LocationEvents index={3} /> },
    { path: '/queensmakers', element: <LocationEvents index={4} /> },
    { path: '/events', element: <Events /> }
  ])

  return (
    <div className='app'>
      <header className='main-header'>
        <h1>NYC Crochet & Crafts 🧶</h1>
        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>
      <main>
        {element}
      </main>
    </div>
  )
}

export default App