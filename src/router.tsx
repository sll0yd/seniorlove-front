import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.tsx';

// Pages publiques
//----------------
import HomePage from './pages/Home/HomePage.tsx';
// import Login
// import Register

// Pages protégées
//----------------
import EventsLists from './pages/Events/EventsLists.tsx';
// import EventDetail 
// import EventCreate 
// import EventEdit 

// import Profile 
// import ProfileEdit
import ProfilesLists from './pages/Profile/ProfileLists.tsx';
// import UserSearch 

// import Messages 
// import Conversation 

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/events',
        element: <EventsLists />,
      },
      {
        path: '/profile',
        element: <ProfilesLists />,
      }
      // {
      //   path: '/recipe/:slug',
      //   element: <RecipeDetailPage />,
      // },
      // {
      //   path: '/favorites',
      //   element: <FavoritesPage />,
      // },
    ],
  },
]);

export default router;