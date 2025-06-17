const sharp = require('sharp');
const fg = require('fast-glob');
const path = require('path');
const fs = require('fs');

const inputDir = 'assets';
const quality = 75;
const sizeLimitKB = 500; // Compress only if larger than this

(async () => {
  const files = await fg([`${inputDir}/**/*.{jpg,jpeg,png}`]);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const statsBefore = fs.statSync(file);
    const sizeBeforeKB = statsBefore.size / 1024;

    if (sizeBeforeKB < sizeLimitKB) {
      console.log(`⚠️ Skipping: ${file} (${Math.round(sizeBeforeKB)} KB)`);
      continue;
    }

    const tempOutput = file.replace(ext, `-compressed${ext}`);

    try {
      if (ext === '.png') {
        await sharp(file)
          .png({ compressionLevel: 9 })
          .toFile(tempOutput);
      } else {
        await sharp(file)
          .jpeg({ quality })
          .toFile(tempOutput);
      }

      const statsAfter = fs.statSync(tempOutput);
      const sizeAfterKB = statsAfter.size / 1024;

      const saved = Math.round(sizeBeforeKB - sizeAfterKB);
      const percent = ((saved / sizeBeforeKB) * 100).toFixed(1);

      fs.renameSync(tempOutput, file); // Replace original

      console.log(
        `✅ Compressed: ${file}\n   ⏱ Before: ${Math.round(sizeBeforeKB)} KB, After: ${Math.round(sizeAfterKB)} KB, Saved: ${saved} KB (${percent}%)`
      );
    } catch (err) {
      console.error(`❌ Failed: ${file}`, err);
    }
  }

  console.log('🎉 Compression with size comparison complete.');
})();
