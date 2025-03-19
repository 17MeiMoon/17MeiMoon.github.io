/**
 * Skrypt generujący plik images.json na podstawie
 * zawartości folderu "images".
 */

const fs = require("fs");
const path = require("path");

// Ścieżka do folderu z obrazami
const sciezkaFolderuObrazow = path.join(__dirname, "images");
// Ścieżka do docelowego pliku JSON
const sciezkaPlikuJson = path.join(__dirname, "images.json");

// Odczyt plików z folderu "images"
fs.readdir(sciezkaFolderuObrazow, (blad, pliki) => {
  if (blad) {
    console.error("Wystąpił błąd podczas odczytu folderu:", blad);
    process.exit(1);
  }

  // Filtrowanie tylko plików graficznych
  const plikiGraficzne = pliki.filter(nazwaPliku =>
    nazwaPliku.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );

  // Zapisujemy listę plików do images.json
  fs.writeFileSync(sciezkaPlikuJson, JSON.stringify(plikiGraficzne, null, 2), "utf-8");
  console.log("Plik images.json został zaktualizowany:", plikiGraficzne);
});
