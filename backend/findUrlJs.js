import fs from "fs";
import path from "path";

const backendDir = "./"; // ton dossier backend

// Récupérer tous les fichiers JS d’un dossier récursivement
function getAllJsFiles(dir) {
  let files = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach((f) => {
    const fullPath = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name === "node_modules") return;
      files = files.concat(getAllJsFiles(fullPath));
    } else if (f.isFile() && f.name.endsWith(".js")) {
      files.push(fullPath);
    }
  });
  return files;
}

// Chercher toutes les lignes contenant 'url.js'
function findUrlJs() {
  const jsFiles = getAllJsFiles(backendDir);
  let found = false;

  jsFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n");
    lines.forEach((line, idx) => {
      if (line.includes("url.js")) {
        found = true;
        console.log(`⚠️ ${file} : ligne ${idx + 1} → ${line.trim()}`);
      }
    });
  });

  if (!found) {
    console.log("✅ Aucun import de 'url.js' trouvé dans le backend.");
  }
}

findUrlJs();
