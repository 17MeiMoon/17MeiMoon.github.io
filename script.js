document.addEventListener("DOMContentLoaded", () => {
	/* ===========================================
	   1. TRYB CIEMNY
	============================================ */
	const body = document.body;
	const darkModeButton = document.getElementById("dark-mode-button");
	const darkModeIcon = document.getElementById("dark-mode-icon");
	const darkModeText = document.getElementById("dark-mode-text");

	// Sprawdzenie zapisanego trybu w localStorage
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme === "dark") {
		body.classList.add("dark-mode");
		darkModeIcon.classList.replace("fa-moon", "fa-sun");
		darkModeText.textContent = "Tryb jasny";
	} else {
		localStorage.setItem("theme", "light");
	}

	// Przełączanie trybu jasny/ciemny
	darkModeButton.addEventListener("click", () => {
		body.classList.toggle("dark-mode");

		if (body.classList.contains("dark-mode")) {
			localStorage.setItem("theme", "dark");
			darkModeIcon.classList.replace("fa-moon", "fa-sun");
			darkModeText.textContent = "Tryb jasny";
		} else {
			localStorage.setItem("theme", "light");
			darkModeIcon.classList.replace("fa-sun", "fa-moon");
			darkModeText.textContent = "Tryb ciemny";
		}
	});

	/* ===========================================
	   2. AKTUALNY ROK W STOPCE
	============================================ */
	const currentYearElement = document.getElementById("current-year");
	if (currentYearElement) {
		currentYearElement.textContent = new Date().getFullYear();
	}

	/* ===========================================
	   3. FORMULARZ REZERWACJI
	============================================ */
	const reservationForm = document.getElementById("reservation-form");
	if (reservationForm) {
		const startDateInput = document.getElementById("start-date");
		const endDateInput = document.getElementById("end-date");
		const dateFeedback = document.getElementById("date-feedback");
		const daysCount = document.getElementById("days-count");
		const submitButton = reservationForm.querySelector("button[type='submit']");

		// Minimalna data startowa (dzisiaj)
		const today = new Date().toISOString().split("T")[0];
		if (startDateInput) startDateInput.min = today;

		// Funkcja walidująca poprawność dat
		function validateDates() {
			if (!startDateInput || !endDateInput) return;

			const startDateValue = startDateInput.value;
			const endDateValue = endDateInput.value;

			if (!startDateValue || !endDateValue) {
				dateFeedback.textContent = "";
				daysCount.textContent = "";
				submitButton.disabled = true;
				return;
			}

			endDateInput.min = startDateValue;

			if (endDateValue < startDateValue) {
				dateFeedback.textContent =
					"Data wyjazdu nie może być wcześniejsza niż data przyjazdu.";
				daysCount.textContent = "";
				submitButton.disabled = true;
			} else {
				const diffInMs = new Date(endDateValue) - new Date(startDateValue);
				const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

				dateFeedback.textContent = "";
				daysCount.textContent = "Liczba noclegów: " + diffInDays;
				submitButton.disabled = false;
			}
		}

		// Walidacja dat przy zmianie
		startDateInput.addEventListener("change", validateDates);
		endDateInput.addEventListener("change", validateDates);

		// Obsługa wysyłania formularza
		reservationForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const baseUrl =
				"https://docs.google.com/forms/d/e/1FAIpQLScAtUmm8EZX9dqNX0KWl1UdSoW1pZOB1Gf9SfK_BtmpbTvGMg/viewform?usp=pp_url";
			const finalUrl = `${baseUrl}&entry.804956421=${encodeURIComponent(
				startDateInput.value
			)}&entry.1257348320=${encodeURIComponent(endDateInput.value)}`;
			window.open(finalUrl, "_blank");
		});
	}

	/* ===========================================
	   4. KARUZELA (SLIDER)
	============================================ */
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector("#prev");
    const nextBtn = document.querySelector("#next");
    let currentIndex = 0;

    function updateCarousel() {
        slides.forEach(slide => {
            slide.classList.remove("prev", "current", "next");
            slide.style.opacity = 0;
        });

        slides[currentIndex].classList.add("current");
        slides[currentIndex].style.opacity = 1;

        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        slides[prevIndex].classList.add("prev");
        slides[prevIndex].style.opacity = 0.3;

        const nextIndex = (currentIndex + 1) % slides.length;
        slides[nextIndex].classList.add("next");
        slides[nextIndex].style.opacity = 0.3;
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    // Pierwsze wywołanie dla inicjalizacji
    updateCarousel();
	startAutoSlide();
});
