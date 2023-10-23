import { useState } from 'react'

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import Header from './components/Header';
import EventsCarousel from './components/EventsCarousel';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Header img={'src/imgs/OBCenter.jpg'} title='CaDS Faculty Led Projects!' />
      <ProjectList />
      <EventsCarousel />

      <Footer />
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Footer />
    </>
  )
}

export default App
