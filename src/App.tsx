import './index.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';
import DiscoverSeniorLove from './components/DiscoverSeniorLove';
import EventsForYou from './components/EventsForYou';
import Testimony from './components/Testimony';

function App() {
  return (
    <div>
      <Nav />
      <Header />
      <DiscoverSeniorLove />
			<EventsForYou />
			<Testimony />
      <Footer />
    </div>
  );
}

export default App;
