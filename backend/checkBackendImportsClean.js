
import fs from "fs";
import path from "path";

const backendDir = "./"; // dossier backend

// Récupérer tous les fichiers JS d’un dossier récursivement (ignore node_modules)
function getAllJsFiles(dir) {
  let files = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach((f) => {
    const fullPath = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name === "node_modules") return; // ignore node_modules
      files = files.concat(getAllJsFiles(fullPath));
    } else if (f.isFile() && f.name.endsWith(".js")) {
      files.push(fullPath);
    }
  });
  return files;
}

// Récupérer tous les exports nommés d’un fichier
function getExports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const matches = [...content.matchAll(/export const (\w+)/g)];
  return matches.map((m) => m[1]);
}

// Vérifier les imports dans un fichier
function checkImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const importMatches = [...content.matchAll(/import\s+\{([\w\s,]+)\}\s+from\s+["'](.+)["']/g)];

  importMatches.forEach(match => {
    const importedNames = match[1].split(",").map(n => n.trim());
    let importPath = match[2];

    // Résolution du chemin relatif
    if (!importPath.endsWith(".js")) importPath += ".js";
    const fullPath = path.resolve(path.dirname(filePath), importPath);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️ Fichier importé introuvable: ${fullPath} dans ${filePath}`);
      return;
    }

    const exportedNames = getExports(fullPath);
    importedNames.forEach(name => {
      if (!exportedNames.includes(name)) {
        console.log(`❌ Erreur dans ${filePath}: '${name}' n'est pas exporté par ${fullPath}`);
      }
    });
  });
}

// Scanner tout le backend
function scanBackend() {
  console.log("🔍 Scan des imports/exports du backend...");
  const jsFiles = getAllJsFiles(backendDir);
  jsFiles.forEach(file => checkImportsInFile(file));
  console.log("✅ Scan terminé !");
}

scanBackend();
