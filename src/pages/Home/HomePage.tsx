import Header from '../../components/Header';
import DiscoverSeniorLove from '../../components/DiscoverSeniorLove';
import EventsForYou from '../../components/EventsForYou';
import Testimony from '../../components/Testimony';
import CategoriesForYou from '../../components/CategoriesForYou';
import FooterBanner from '../../components/FooterBanner';

const HomePage = () => {
  return (
    <div>
      <Header />
      <DiscoverSeniorLove />
      <EventsForYou />
      <CategoriesForYou />
      <Testimony />
      <FooterBanner />
    </div>
  );
};

export default HomePage;
