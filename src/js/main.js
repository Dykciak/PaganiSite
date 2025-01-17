let nav; // nawigacja
let navBtn; // przycisk otwierający/zamykający nawigację
let allNavItems; // wszystkie elementy w nawigacji
let navBtnBars; // ikona przycisku nawigacji
let buttons; // przyciski karuzeli

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
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

var swiper = new Swiper(".mySwiper", {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: true,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	autoplay: {
		delay: 5000,
	},
	grid: {
		rows: 1,
	},
});

document.addEventListener("DOMContentLoaded", main);
