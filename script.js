// Settings
const BLOCK_SIZE = 40; // size of each block in pixels
const map = document.getElementById('map');
const container = document.getElementById('map-container');

// Create overlay for blocks
const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.pointerEvents = 'none'; // initially blocks won’t block zoom
container.appendChild(overlay);

// Calculate how many blocks fit
const numBlocksX = Math.floor(map.naturalWidth / BLOCK_SIZE);
const numBlocksY = Math.floor(map.naturalHeight / BLOCK_SIZE);

// Function to create a single block
function createBlock(x, y, id) {
  const block = document.createElement('div');
  block.style.position = 'absolute';
  block.style.width = `${BLOCK_SIZE}px`;
  block.style.height = `${BLOCK_SIZE}px`;
  block.style.left = `${x * BLOCK_SIZE}px`;
  block.style.top = `${y * BLOCK_SIZE}px`;
  block.style.border = '1px solid rgba(0,0,0,0.1)';
  block.style.background = 'rgba(255,255,255,0.01)'; // almost invisible
  block.style.pointerEvents = 'auto';
  block.dataset.id = id;

  // Click event for the block
  block.addEventListener('click', () => {
    const name = prompt('Enter your name for this block:');
    if (name) {
      block.style.background = 'rgba(0,255,0,0.4)'; // mark as sold
      console.log(`Block ${id} bought by ${name}`);
    }
  });

  overlay.appendChild(block);
}

// Create all blocks
let id = 0;
for (let y = 0; y < numBlocksY; y++) {
  for (let x = 0; x < numBlocksX; x++) {
    createBlock(x, y, id++);
  }
}
