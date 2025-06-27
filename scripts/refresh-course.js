// scripts/refresh-course.js
const { execSync } = require('child_process');

try {
  execSync('npm run lint && npm run type-check && contentlayer build && next build', { stdio: 'inherit' });
  console.log('Course refresh complete!');
} catch (error) {
  console.error('Course refresh failed:', error);
  process.exit(1);
}
