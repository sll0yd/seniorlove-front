import '../index.css';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DiscoverSeniorLove from '../components/DiscoverSeniorLove';
import EventsForYou from '../components/EventsForYou';
import Testimony from '../components/Testimony';
import CategoriesForYou from '../components/CategoriesForYou';
import FooterBanner from '../components/FooterBanner';

function HomePage() {
  return (
    <div>
      <Nav />
      <Header />
      <DiscoverSeniorLove />
      <EventsForYou />
      <CategoriesForYou />
      <Testimony />
      <FooterBanner />
      <Footer />
    </div>
  );
}

export default HomePage;
