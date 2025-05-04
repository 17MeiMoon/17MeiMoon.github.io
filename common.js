/**
 * Skrypt wspólny dla wszystkich stron:
 *  - Ustawia bieżący rok w stopce (jeśli istnieje element o ID "current-year").
 */

document.addEventListener('DOMContentLoaded', () => {
    // Ustawienie roku w stopce
    const rokElement = document.getElementById('current-year');
    if (rokElement) {
      rokElement.textContent = new Date().getFullYear();
    }
  });
  