let nav; // nawigacja
let navBtn; // przycisk otwierający/zamykający nawigację
let allNavItems; // wszystkie elementy w nawigacji
let navBtnBars; // ikona przycisku nawigacji
let buttons; // przyciski karuzeli

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	startCarouselAutoPlay();
};

// pobieranie wszystkich elementów
const prepareDOMElements = () => {
	nav = document.querySelector(".nav");
	navBtn = document.querySelector(".burger-btn");
	allNavItems = document.querySelectorAll(".nav__item");
	navBtnBars = document.querySelector(".burger-btn__bars");
	buttons = document.querySelectorAll("[data-carousel-button]");
};

// nadawanie nasłuchiwania elementom
const prepareDOMEvents = () => {
	navBtn.addEventListener("click", handleNav);
	buttons.forEach((button) => {
		button.addEventListener("click", handleCarousel);
	});
};

// obsługa nawigacji
const handleNav = () => {
	nav.classList.toggle("nav--active");
	allNavItems.forEach((item) => {
		item.addEventListener("click", () => {
			nav.classList.remove("nav--active");
		});
	});
	handleNavItemsAnimation();
};

// animacja elementów nawigacji
const handleNavItemsAnimation = () => {
	let delayTime = 0;
	allNavItems.forEach((item) => {
		item.classList.toggle("nav-items-animation");
		item.style.animationDelay = `0.${delayTime}s`;
		delayTime++;
	});
};

// obsługa karuzeli
const handleCarousel = (e) => {
	const offset = e.target.dataset.carouselButton === "right" ? 1 : -1; // określa kierunek przesunięcia
	moveCarousel(offset);
};

// automatyczne przewijanie karuzeli
const startCarouselAutoPlay = () => {
	carouselInterval = setInterval(() => {
		moveCarousel(1); // przesuwa karuzelę o jeden slajd w prawo co 10 sekund
	}, 10000);
};

// przesuwanie karuzeli
const moveCarousel = (offset) => {
	const slides = document.querySelector("[data-slides]"); // znajduje listę slajdów
	const activeSlide = slides.querySelector("[data-active]"); // znajduje aktywny slajd
	let newIndex = [...slides.children].indexOf(activeSlide) + offset;

	// ustawia nowy indeks, obsługując początek i koniec listy slajdów
	if (newIndex < 0) newIndex = slides.children.length - 1;
	if (newIndex >= slides.children.length) newIndex = 0;

	slides.children[newIndex].dataset.active = true; // ustawia nowy aktywny slajd
	delete activeSlide.dataset.active; // usuwa status aktywności z poprzedniego slajdu
};

document.addEventListener("DOMContentLoaded", main);
