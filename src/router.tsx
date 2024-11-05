import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";

// Pages publiques
//----------------
import HomePage from "./pages/Home/HomePage.tsx";
// import Login
// import Register

// Pages protégées
//----------------
import EventsLists from "./pages/Events/EventsLists.tsx";
import EventDetail from "./pages/Events/EventDetail.tsx";
// import EventCreate
// import EventEdit

import ProfileDetail from "./pages/Profile/ProfileDetail.tsx";
// import ProfileEdit
import ProfilesLists from "./pages/Profile/ProfileLists.tsx";
// import UserSearch

// import Messages
// import Conversation

// Routes
const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/events",
				element: <EventsLists />,
			},
			{
				path: "/events/:id",
				element: <EventDetail />,
			},
			{
				path: "/profile",
				element: <ProfilesLists />,
			},
			{
				path: "/profile/:id",
				element: <ProfileDetail />,
			},

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
