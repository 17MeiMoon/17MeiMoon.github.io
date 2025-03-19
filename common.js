/**
 * Skrypt wspólny dla wszystkich stron:
 *  - Ustawia bieżący rok w stopce (jeśli istnieje element o ID "current-year").
 *  - Obsługuje tryb jasny/ciemny (dark mode) za pomocą lokalnego magazynu (localStorage).
 */

document.addEventListener('DOMContentLoaded', () => {
    // Ustawienie roku w stopce
    const rokElement = document.getElementById('current-year');
    if (rokElement) {
      rokElement.textContent = new Date().getFullYear();
    }
  
    // Obsługa przełączania trybu ciemnego
    const przyciskTrybCiemny = document.getElementById('dark-mode-button');
    const ikonaTrybu = document.getElementById('dark-mode-icon');
    const tekstTrybu = document.getElementById('dark-mode-text');
    const html = document.documentElement;
  
    // Sprawdzamy, czy w localStorage zapisana jest preferencja 'dark'
    if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
      if (ikonaTrybu) {
        ikonaTrybu.classList.replace('fa-moon', 'fa-sun');
      }
      if (tekstTrybu) {
        tekstTrybu.textContent = 'Tryb jasny';
      }
    }
  
    // Kliknięcie przycisku trybu ciemnego
    if (przyciskTrybCiemny) {
      przyciskTrybCiemny.addEventListener('click', () => {
        html.classList.toggle('dark');
  
        // Zapisujemy wybrany tryb w localStorage
        if (html.classList.contains('dark')) {
          localStorage.setItem('theme', 'dark');
          if (ikonaTrybu) {
            ikonaTrybu.classList.replace('fa-moon', 'fa-sun');
          }
          if (tekstTrybu) {
            tekstTrybu.textContent = 'Tryb jasny';
          }
        } else {
          localStorage.setItem('theme', 'light');
          if (ikonaTrybu) {
            ikonaTrybu.classList.replace('fa-sun', 'fa-moon');
          }
          if (tekstTrybu) {
            tekstTrybu.textContent = 'Tryb ciemny';
          }
        }
      });
    }
  });
  