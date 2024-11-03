import './index.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';
import DiscoverSeniorLove from './components/DiscoverSeniorLove';
import EventsForYou from './components/EventsForYou';
import Testimony from './components/Testimony';
import CategoriesForYou from './components/CategoriesForYou';
import EventDetail from './components/EventDetail';
import EventsLists from './components/EventsLists';
import ProfileDetail from './components/ProfileDetail';
import ProfileLists from './components/ProfileLists';

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
      <EventDetail />
      <EventsLists />
      <ProfileDetail />
      <ProfileLists />
    </div>
  );
}

export default App;
