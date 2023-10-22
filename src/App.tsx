import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import Header from './components/Header';
import EventsCarousel from './components/EventsCarousel';

function App() {

  return (
    <>
      <NavBar />
      <Header img={'src/imgs/OBCenter.jpg'} title='CaDS Faculty Led Projects!' />
      <ProjectList />
      <EventsCarousel />

      <Footer />
    </>
  )
}

export default App
