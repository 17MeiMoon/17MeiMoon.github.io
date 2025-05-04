/**
 * Skrypt generujący plik images_....json na podstawie
 * zawartości folderu "images ...".
 */

const fs = require("fs");
const path = require("path");

// Ścieżka do folderu z obrazami
const sciezkaFolderuObrazow_Hotel = path.join(__dirname, "images_Hotel");
const sciezkaFolderuObrazow_Spa = path.join(__dirname, "images_Spa");
// Ścieżka do docelowego pliku JSON
const sciezkaPlikuJson_Hotel = path.join(__dirname, "images_Hotel.json");
const sciezkaPlikuJson_Spa = path.join(__dirname, "images_Spa.json");

// Odczyt plików z folderu "images"
fs.readdir(sciezkaFolderuObrazow_Hotel, (blad, pliki) => {
  if (blad) {
    console.error("Wystąpił błąd podczas odczytu folderu:", blad);
    process.exit(1);
  }

  // Filtrowanie tylko plików graficznych
  const plikiGraficzne = pliki.filter(nazwaPliku =>
    nazwaPliku.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );

  // Zapisujemy listę plików do images.json
  fs.writeFileSync(sciezkaPlikuJson_Hotel, JSON.stringify(plikiGraficzne, null, 2), "utf-8");
  console.log("Plik images.json został zaktualizowany:", plikiGraficzne);
});

// Odczyt plików z folderu "images Spa"
fs.readdir(sciezkaFolderuObrazow_Spa, (blad, pliki) => {
  if (blad) {
    console.error("Wystąpił błąd podczas odczytu folderu:", blad);
    process.exit(1);
  }

  // Filtrowanie tylko plików graficznych
  const plikiGraficzne = pliki.filter(nazwaPliku =>
    nazwaPliku.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );

  // Zapisujemy listę plików do images.json
  fs.writeFileSync(sciezkaPlikuJson_Spa, JSON.stringify(plikiGraficzne, null, 2), "utf-8");
  console.log("Plik images.json został zaktualizowany:", plikiGraficzne);
});
