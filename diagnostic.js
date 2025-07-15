// This is a diagnostic script to help troubleshoot GitHub Pages deployments
// Save this as diagnostic.js and run it with: node diagnostic.js

const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('\n=====================================================');
console.log('GitHub Pages Deployment Diagnostic Tool');
console.log('=====================================================\n');

// Check if the gh-pages branch exists remotely
console.log('1. Checking gh-pages branch existence...');
const options = {
  hostname: 'api.github.com',
  path: '/repos/RocketMobster/nichevendor/branches/gh-pages',
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js'
  }
};

const req = https.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log('   ✓ gh-pages branch exists');
    console.log('\n2. Checking GitHub Pages configuration...');
    console.log('   Please verify these settings manually:');
    console.log('   - Go to https://github.com/RocketMobster/nichevendor/settings/pages');
    console.log('   - Source should be: "Deploy from a branch"');
    console.log('   - Branch should be: "gh-pages" with folder set to "/ (root)"');
    
    console.log('\n3. Testing site URL availability...');
    const siteOptions = {
      hostname: 'rocketmobster.github.io',
      path: '/nichevendor/',
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js'
      }
    };
    
    const siteReq = https.request(siteOptions, (siteRes) => {
      console.log(`   Response status code: ${siteRes.statusCode}`);
      if (siteRes.statusCode === 200) {
        console.log('   ✓ Site is available at https://rocketmobster.github.io/nichevendor/');
      } else if (siteRes.statusCode === 404) {
        console.log('   ✗ Site returned 404 - Not Found');
        console.log('     This could mean:');
        console.log('     - GitHub Pages is still building your site (wait 5-10 minutes)');
        console.log('     - The GitHub Pages settings are incorrect');
        console.log('     - There\'s an issue with your Next.js configuration');
      } else {
        console.log(`   ✗ Site returned unexpected status: ${siteRes.statusCode}`);
      }
      
      console.log('\n4. Checking Next.js configuration...');
      try {
        const nextConfig = fs.readFileSync(path.join(process.cwd(), 'next.config.js'), 'utf8');
        if (nextConfig.includes('basePath') && nextConfig.includes('/nichevendor')) {
          console.log('   ✓ next.config.js has correct basePath configuration');
        } else {
          console.log('   ✗ next.config.js might be missing proper basePath configuration');
          console.log('     Should include: basePath: process.env.NODE_ENV === \'production\' ? \'/nichevendor\' : \'\',');
        }
        
        if (nextConfig.includes('assetPrefix') && nextConfig.includes('/nichevendor/')) {
          console.log('   ✓ next.config.js has correct assetPrefix configuration');
        } else {
          console.log('   ✗ next.config.js might be missing proper assetPrefix configuration');
          console.log('     Should include: assetPrefix: process.env.NODE_ENV === \'production\' ? \'/nichevendor/\' : \'\',');
        }
        
        if (nextConfig.includes('output: \'export\'')) {
          console.log('   ✓ next.config.js has static export configuration');
        } else {
          console.log('   ✗ next.config.js is missing output: \'export\' configuration');
        }
      } catch (err) {
        console.log('   ✗ Could not read next.config.js file:', err.message);
      }
      
      console.log('\n=====================================================');
      console.log('Recommendations:');
      console.log('=====================================================');
      console.log('1. If the gh-pages branch exists but the site shows 404:');
      console.log('   - Wait 5-10 minutes for GitHub Pages to finish building');
      console.log('   - Verify GitHub Pages settings are correct');
      console.log('   - Make sure there\'s an index.html file in the gh-pages branch');
      console.log('\n2. If problems persist:');
      console.log('   - Check if your repository is public (required for GitHub Pages)');
      console.log('   - Try adding a simple index.html to your gh-pages branch');
      console.log('   - Review GitHub Actions workflow logs for errors');
      console.log('=====================================================\n');
    });
    
    siteReq.on('error', (error) => {
      console.log('   ✗ Error checking site URL:', error.message);
    });
    
    siteReq.end();
    
  } else if (res.statusCode === 404) {
    console.log('   ✗ gh-pages branch does not exist yet');
    console.log('     Try running the GitHub Actions workflow first');
  } else {
    console.log(`   ✗ Unexpected status code: ${res.statusCode}`);
  }
});

req.on('error', (error) => {
  console.log('   ✗ Error checking branch:', error.message);
});

req.end();
