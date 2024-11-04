import './index.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';
import DiscoverSeniorLove from './components/DiscoverSeniorLove';
import EventsForYou from './components/EventsForYou';
import Testimony from './components/Testimony';
import CategoriesForYou from './components/CategoriesForYou';


function App() {
  return (
    <div>
      <Nav />
      <Header />
      <DiscoverSeniorLove />
      <EventsForYou />
      <CategoriesForYou />
      <Testimony />
      <Footer />
    </div>
  );
}

export default App;
