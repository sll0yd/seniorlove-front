import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import DiscoverSeniorLove from "../../components/DiscoverSeniorLove";
import EventsForYou from "../../components/EventsForYou";
import Testimony from "../../components/Testimony";
import CategoriesForYou from "../../components/CategoriesForYou";
import FooterBanner from "../../components/FooterBanner";

const HomePage = () => {
	// useLocation permet d'accéder aux informations de navigation (comme l'état)
	const location = useLocation();

	// useRef crée des références vers nos éléments DOM pour pouvoir les manipuler
	// Comme pointer vers ces éléments pour faire défiler la page
	const discoverRef = useRef<HTMLDivElement>(null);
	const testimonyRef = useRef<HTMLDivElement>(null);

	// Cette fonction gère le défilement vers les différentes sections
	// useCallback mémorise la fonction pour éviter des re-renders inutiles
	const scrollToSection = useCallback((sectionName: string) => {
		// On crée un objet qui associe le nom de la section à sa référence
		const refs = {
			DiscoverSeniorLove: discoverRef,
			Testimony: testimonyRef,
		};

		// On récupère la référence correspondant au nom de la section
		const targetRef = refs[sectionName as keyof typeof refs];

		// scrollIntoView fait défiler la page jusqu'à l'élément
		// behavior: 'smooth' ajoute une animation douce au défilement
		targetRef?.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	// Ce useEffect se déclenche quand on arrive sur la page avec un état de navigation
	// Par exemple, quand on clique sur un lien qui doit faire défiler vers une section
	useEffect(() => {
		// Si on a une section spécifiée dans l'état
		if (location.state?.scrollTo) {
			// On défile vers cette section
			scrollToSection(location.state.scrollTo);
			// On nettoie l'état pour éviter des défilements indésirables
			window.history.replaceState({}, document.title);
		}
	}, [location.state, scrollToSection]);

	// Ce useEffect gère les événements de défilement venant de la navigation
	useEffect(() => {
		// Fonction qui sera appelée quand l'événement 'scrollToSection' est déclenché
		const handleScrollEvent = (event: Event) => {
			// On convertit l'événement en CustomEvent pour accéder à la donnée
			const customEvent = event as CustomEvent<string>;
			// On déclenche le défilement vers la section
			scrollToSection(customEvent.detail);
		};

		// On ajoute un écouteur d'événement sur window
		window.addEventListener("scrollToSection", handleScrollEvent);

		// Fonction de nettoyage : on retire l'écouteur quand le composant est démonté
		return () =>
			window.removeEventListener("scrollToSection", handleScrollEvent);
	}, [scrollToSection]);

	return (
		<div>
			<Header />

			<div ref={discoverRef} className="scroll-mt-[55px]">
				<DiscoverSeniorLove />
			</div>
			<EventsForYou />
			<CategoriesForYou />
			<div ref={testimonyRef} className="scroll-mt-[55px]">
				<Testimony />
			</div>
			<FooterBanner />
		</div>
	);
};

export default HomePage;
