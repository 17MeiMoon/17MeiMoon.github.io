document.addEventListener("DOMContentLoaded", () => {

    /* ===========================================
       1. TRYB CIEMNY
    ============================================ */
    const darkModeButton = document.getElementById("dark-mode-button");
    const darkModeIcon   = document.getElementById("dark-mode-icon");
    const darkModeText   = document.getElementById("dark-mode-text");
  
    if (darkModeButton) {
      darkModeButton.addEventListener("click", () => {
        // Sprawdzamy, czy body już ma klasę "dark-mode"
        if (document.body.classList.contains("dark-mode")) {
          // Wyłączamy tryb ciemny
          document.body.classList.remove("dark-mode");
          darkModeIcon.classList.remove("fa-sun");
          darkModeIcon.classList.add("fa-moon");
          darkModeText.textContent = "Tryb ciemny";
        } else {
          // Włączamy tryb ciemny
          document.body.classList.add("dark-mode");
          darkModeIcon.classList.remove("fa-moon");
          darkModeIcon.classList.add("fa-sun");
          darkModeText.textContent = "Tryb jasny";
        }
      });
    }
  
    /* ===========================================
       2. USTAWIENIE ROKU W STOPCE
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
      const endDateInput   = document.getElementById("end-date");
      const dateFeedback   = document.getElementById("date-feedback");
      const daysCount      = document.getElementById("days-count");
      const submitButton   = reservationForm.querySelector("button[type='submit']");
  
      // Ustawiamy minimalną datę przyjazdu na dzisiaj
      const today = new Date().toISOString().split("T")[0]; 
      if (startDateInput) {
        startDateInput.min = today;
      }
  
      // Walidacja dat
      function validateDates() {
        if (!startDateInput || !endDateInput) return;
  
        const startDateValue = startDateInput.value;
        const endDateValue   = endDateInput.value;
  
        // Jeśli nie ma obu dat
        if (!startDateValue || !endDateValue) {
          dateFeedback.textContent = "";
          daysCount.textContent     = "";
          submitButton.disabled     = true;
          return;
        }
  
        // Minimalna data wyjazdu to data przyjazdu (nie może być wcześniej)
        endDateInput.min = startDateValue;
  
        if (endDateValue < startDateValue) {
          dateFeedback.textContent = "Data wyjazdu nie może być wcześniejsza niż data przyjazdu.";
          daysCount.textContent    = "";
          submitButton.disabled    = true;
        } else {
          // Obliczamy liczbę dni (noclegów)
          const start = new Date(startDateValue);
          const end   = new Date(endDateValue);
          const diffInMs = end - start;
          const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  
          dateFeedback.textContent = "";
          daysCount.textContent    = "Liczba noclegów: " + diffInDays;
          submitButton.disabled    = false;
        }
      }
  
      // Nasłuchujemy zmian w polach dat, by na bieżąco walidować
      startDateInput.addEventListener("change", validateDates);
      endDateInput.addEventListener("change", validateDates);
  
      // Obsługa "submit" – przekierowanie do Google Forms z pre-fill (przykład)
      reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        // Podstawowy URL do Google Forms (pre-fill) - podaj swoje "entry.xxxxx" 
        const baseUrl =
          "https://docs.google.com/forms/d/e/1FAIpQLScAtUmm8EZX9dqNX0KWl1UdSoW1pZOB1Gf9SfK_BtmpbTvGMg/viewform?usp=pp_url";
  
        // Pobieramy wybrane daty
        const startDate = startDateInput.value;
        const endDate   = endDateInput.value;
  
        // Sklejamy link z parametrami - pamiętaj, aby wstawić właściwe ID pól
        let finalUrl =
          baseUrl
          + "&entry.1636713435=" + encodeURIComponent(startDate)
          + "&entry.1731149603=" + encodeURIComponent(endDate);
  
        // Otwieramy Google Forms w nowej karcie
        window.open(finalUrl, "_blank");
  
        // Możesz wyświetlić potwierdzenie lub zresetować formularz:
        alert("Rezerwacja została przyjęta!");
        reservationForm.reset();
        dateFeedback.textContent = "";
        daysCount.textContent     = "";
        submitButton.disabled     = true;
      });
    }
  
  });
