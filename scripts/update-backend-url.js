#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the new backend URL from command line argument
const newBackendUrl = process.argv[2];

if (!newBackendUrl) {
  console.log('Usage: node scripts/update-backend-url.js <your-backend-url>');
  console.log('Example: node scripts/update-backend-url.js https://dental-salary-app-backend.onrender.com');
  process.exit(1);
}

// Path to the API config file
const apiConfigPath = path.join(__dirname, '../src/config/api.ts');

// Read the current config
let configContent = fs.readFileSync(apiConfigPath, 'utf8');

// Replace the placeholder URL with the actual backend URL
configContent = configContent.replace(
  /baseURL: 'https:\/\/your-backend-url\.onrender\.com'/,
  `baseURL: '${newBackendUrl}'`
);

// Write the updated config back
fs.writeFileSync(apiConfigPath, configContent);

console.log(`✅ Updated backend URL to: ${newBackendUrl}`);
console.log('📝 Don\'t forget to:');
console.log('   1. Commit and push your changes');
console.log('   2. Run "npm run deploy" to deploy the updated frontend'); 