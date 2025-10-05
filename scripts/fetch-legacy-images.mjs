import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Legacy image mappings from the WillHammer site
const legacyImages = [
  { filename: 'WH-TLSH-1.jpg', productHandle: 'tower-lineman-safety-harness', description: 'Tower Lineman Safety Harness' },
  { filename: 'WH-ORFF-CSFH-1.jpg', productHandle: 'oil-rigging-chemical-safety-harness', description: 'Oil Rigging Chemical Harness' },
  { filename: 'WH-RCH-21-1.jpg', productHandle: 'rescue-command-tactical-harness', description: 'Rescue Command Tactical Harness' },
  { filename: 'WH-FMSH-1.jpg', productHandle: 'fall-master-tech-harness', description: 'Fall Master Tech Harness' },
  { filename: 'WH-ERRHstart.jpg', productHandle: 'elite-rappelling-harness', description: 'Elite Rappelling Harness' },
  { filename: 'WH-WRB-1.jpg', productHandle: 'professional-riggers-belt', description: 'Professional Riggers Belt' },
  { filename: 'TAP-CDB.jpg', productHandle: 'construction-duty-belt', description: 'Construction Duty Belt' },
  { filename: 'RDB-300-2.jpg', productHandle: 'rope-deployment-bag-300', description: 'Rope Deployment Bag' },
  { filename: 'TAP-WEB-1.jpg', productHandle: 'tactical-escape-belt', description: 'Tactical Escape Belt' }
];

const baseArchiveUrl = 'https://web.archive.org/web/20141223002317/http://www.willhammerindustries.com/images/';

async function downloadImage(imageInfo) {
  const url = baseArchiveUrl + imageInfo.filename;
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'products', imageInfo.filename);
  
  try {
    console.log(`🔍 Attempting to fetch: ${imageInfo.filename}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(`❌ Failed to fetch ${imageInfo.filename}: ${response.status}`);
      return null;
    }
    
    const buffer = await response.arrayBuffer();
    
    // Create products directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${imageInfo.filename}`);
    
    return `/images/products/${imageInfo.filename}`;
  } catch (error) {
    console.log(`❌ Error downloading ${imageInfo.filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Fetching legacy product images from WillHammer Industries archive...');
  
  const results = [];
  
  for (const imageInfo of legacyImages) {
    const imagePath = await downloadImage(imageInfo);
    if (imagePath) {
      results.push({
        ...imageInfo,
        imagePath
      });
    }
    
    // Small delay to be respectful to archive.org
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n📊 Results: ${results.length}/${legacyImages.length} images downloaded successfully`);
  
  if (results.length > 0) {
    console.log('\n✅ Successfully downloaded:');
    results.forEach(r => console.log(`   ${r.filename} → ${r.productHandle}`));
    
    // Generate SQL or script to update products with images
    console.log('\n📝 To assign these images to products, run the following commands:');
    results.forEach(r => {
      console.log(`UPDATE products SET images = '[{"url": "${r.imagePath}", "alt": "${r.description}", "position": 0}]' WHERE handle = '${r.productHandle}';`);
    });
  }
  
  console.log('\n🏁 Image fetching completed!');
}

main().catch(console.error);
