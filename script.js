const map = document.getElementById('map');
const container = document.getElementById('map-container');

map.onload = () => {
  // Initialize Panzoom
  const panzoom = Panzoom(map, { maxScale: 5, minScale: 1, contain: 'outside', cursor: 'grab' });

  // Drag only when mouse is pressed
  let isDragging = false;
  map.parentElement.addEventListener('mousedown', () => { isDragging = true; });
  map.parentElement.addEventListener('mouseup', () => { isDragging = false; });
  map.parentElement.addEventListener('mouseleave', () => { isDragging = false; });

  map.parentElement.addEventListener('mousemove', (e) => {
    if (isDragging) panzoom.pan(e);
  });

  // Enable wheel zoom
  map.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

  // Create overlay for pixel blocks
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.pointerEvents = 'none';
  container.appendChild(overlay);

  // Blocks
  const BLOCK_SIZE = 40;
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

      // Double-click to "buy" block
      block.addEventListener('dblclick', () => {
        const name = prompt('Enter your name for this block:');
        if (name) block.classList.add('sold');
      });

      overlay.appendChild(block);
    }
  }
};
