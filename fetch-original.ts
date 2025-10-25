#!/usr/bin/env bun

// Fetch the original Index.tsx from commit e77b2e1
const url = 'https://raw.githubusercontent.com/pr-poehali-dev/request-board-project/e77b2e1288e7c0df3b80d2835959d003816881b1/src/pages/Index.tsx';

console.log('Fetching original Index.tsx from GitHub...');
console.log('URL:', url);

const response = await fetch(url);

if (!response.ok) {
  console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const content = await response.text();

// Write to the src/pages directory
await Bun.write('src/pages/Index.tsx.original', content);

console.log('\n✓ File downloaded successfully!');
console.log('✓ Saved to: src/pages/Index.tsx.original');
console.log('✓ Size:', content.length, 'bytes');
console.log('✓ Lines:', content.split('\n').length);
console.log('\nTo restore the original file, run:');
console.log('  mv src/pages/Index.tsx src/pages/Index.tsx.refactored');
console.log('  mv src/pages/Index.tsx.original src/pages/Index.tsx');