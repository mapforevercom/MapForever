const BLOCK_SIZE = 40;
const container = document.getElementById('map-container');
const map = document.getElementById('map');

// Create overlay div
const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.pointerEvents = 'none';
container.appendChild(overlay);

// Wait for map to load to get naturalWidth
map.onload = () => {
  const numBlocksX = Math.floor(map.naturalWidth / BLOCK_SIZE);
  const numBlocksY = Math.floor(map.naturalHeight / BLOCK_SIZE);

  let id = 0;
  for (let y = 0; y < numBlocksY; y++) {
    for (let x = 0; x < numBlocksX; x++) {
      const block = document.createElement('div');
      block.classList.add('block');
      block.style.left = `${x * BLOCK_SIZE}px`;
      block.style.top = `${y * BLOCK_SIZE}px`;
      block.dataset.id = id++;

      // Click event
      block.addEventListener('click', () => {
        const name = prompt('Enter your name for this block:');
        if (name) block.classList.add('sold');
      });

      overlay.appendChild(block);
    }
  }
};
