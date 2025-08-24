const { chromium } = require('playwright');

async function scrapePixabayImages() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  const searchTerms = [
    'artificial intelligence',
    'automation technology',
    'business team',
    'data analytics',
    'modern office',
    'futuristic technology'
  ];
  
  const allImages = {};
  
  for (const term of searchTerms) {
    console.log(`\nSearching for: "${term}"`);
    allImages[term] = [];
    
    try {
      // Navigate to Pixabay and search
      await page.goto('https://pixabay.com/');
      await page.waitForLoadState('networkidle');
      
      // Accept cookies if present
      try {
        await page.click('[data-testid="cookie-notice-acknowledge"]', { timeout: 3000 });
      } catch (e) {
        // Cookie banner might not be present
      }
      
      // Search for the term
      await page.fill('input[name="q"]', term);
      await page.press('input[name="q"]', 'Enter');
      await page.waitForLoadState('networkidle');
      
      // Filter by photos and commercial use
      await page.waitForSelector('a[href*="image_type=photo"]', { timeout: 10000 });
      await page.click('a[href*="image_type=photo"]');
      await page.waitForLoadState('networkidle');
      
      // Wait for images to load
      await page.waitForSelector('div[data-testid="image-container"]', { timeout: 10000 });
      
      // Get image data
      const images = await page.evaluate(() => {
        const imageContainers = document.querySelectorAll('div[data-testid="image-container"]');
        const results = [];
        
        for (let i = 0; i < Math.min(5, imageContainers.length); i++) {
          const container = imageContainers[i];
          const link = container.querySelector('a');
          const img = container.querySelector('img');
          const tagsElement = container.querySelector('[data-testid="image-tags"]');
          
          if (link && img) {
            const imageUrl = img.src;
            const pageUrl = 'https://pixabay.com' + link.getAttribute('href');
            const alt = img.alt || '';
            const tags = tagsElement ? tagsElement.textContent.trim() : '';
            
            // Try to get higher resolution image URL
            const webformatUrl = imageUrl.replace('_150.', '_640.');
            
            results.push({
              imageUrl: webformatUrl,
              pageUrl: pageUrl,
              alt: alt,
              tags: tags,
              quality: 'medium-high'
            });
          }
        }
        
        return results;
      });
      
      console.log(`Found ${images.length} images for "${term}"`);
      allImages[term] = images;
      
      // Add delay between searches
      await page.waitForTimeout(2000);
      
    } catch (error) {
      console.error(`Error searching for "${term}":`, error.message);
    }
  }
  
  await browser.close();
  return allImages;
}

async function main() {
  try {
    console.log('Starting Pixabay image search...');
    const results = await scrapePixabayImages();
    
    console.log('\n=== PIXABAY IMAGE SEARCH RESULTS ===\n');
    
    for (const [term, images] of Object.entries(results)) {
      console.log(`\n🔍 SEARCH TERM: "${term.toUpperCase()}"\n`);
      
      if (images.length === 0) {
        console.log('   No images found for this term.\n');
        continue;
      }
      
      images.forEach((image, index) => {
        console.log(`   ${index + 1}. Image URL: ${image.imageUrl}`);
        console.log(`      Page URL: ${image.pageUrl}`);
        console.log(`      Alt Text: ${image.alt}`);
        console.log(`      Tags: ${image.tags}`);
        console.log(`      Quality: ${image.quality}`);
        console.log('');
      });
      
      // Suggest usage categories
      const usageCategories = getUsageCategories(term, images);
      console.log(`   💡 SUGGESTED USAGE:`);
      usageCategories.forEach(category => {
        console.log(`      - ${category}`);
      });
      console.log('');
    }
    
    // Generate structured JSON output
    console.log('\n=== STRUCTURED JSON OUTPUT ===\n');
    console.log(JSON.stringify(results, null, 2));
    
  } catch (error) {
    console.error('Script failed:', error);
  }
}

function getUsageCategories(term, images) {
  const categories = [];
  
  switch (term.toLowerCase()) {
    case 'artificial intelligence':
    case 'futuristic technology':
      categories.push('Hero section background', 'Technology showcase', 'Blog post thumbnails');
      break;
    case 'automation technology':
      categories.push('Product/service showcase', 'Process illustration', 'Technical blog posts');
      break;
    case 'business team':
      categories.push('About us page', 'Team collaboration sections', 'Company culture content');
      break;
    case 'data analytics':
      categories.push('Service descriptions', 'Case study illustrations', 'Dashboard previews');
      break;
    case 'modern office':
      categories.push('Company environment shots', 'Contact page backgrounds', 'Culture/workspace content');
      break;
    default:
      categories.push('General website content', 'Blog illustrations');
  }
  
  return categories;
}

main().catch(console.error);