/**
 * Skrypt generujący plik images.json na podstawie
 * zawartości folderu "imagines".
 * 
 * Uruchamiaj go lokalnie (node generate-images-json.js)
 * lub z poziomu GitHub Actions.
 */

const fs = require("fs");
const path = require("path");

// Ścieżka do folderu z obrazami
const imagesDir = path.join(__dirname, "imagines");
// Ścieżka do docelowego pliku JSON
const outputFile = path.join(__dirname, "images.json");

// Odczyt plików z folderu "imagines"
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error("Błąd odczytu folderu:", err);
    process.exit(1);
  }

  // Filtrowanie tylko plików graficznych
  const imageFiles = files.filter(file =>
    file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );

  // Zapisujemy listę plików do images.json
  fs.writeFileSync(outputFile, JSON.stringify(imageFiles, null, 2), "utf-8");
  console.log("Plik images.json został zaktualizowany:", imageFiles);
});
