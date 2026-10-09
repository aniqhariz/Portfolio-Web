const fs = require('fs');
const path = require('path');

const srcDownloads = path.join(process.env.USERPROFILE || 'C:\\Users\\S', 'Downloads', 'card_pngs');
const targetPublic = path.join(__dirname, '..', 'public', 'card_pngs');
const targetWorkspace = path.join(__dirname, '..', 'card_pngs');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return false;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('._') || entry.name === '.DS_Store') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  return true;
}

const success = copyRecursive(srcDownloads, targetPublic);
console.log('Copied to public/card_pngs:', success);
if (success) {
  copyRecursive(srcDownloads, targetWorkspace);
  console.log('Synced real PNGs into workspace card_pngs');
}

