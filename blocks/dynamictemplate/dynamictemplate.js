// dynamictemplate.js
export default function decorate(block) {
  block.classList.add('dynamictemplate');

  // 1. grab the Scene 7 URL from the editor text
  const src = block.textContent.trim();

  // 2. clear the placeholder
  block.textContent = '';

  // 3. build a plain <img> so it sizes itself responsively
  const img = document.createElement('img');
  img.src = src;
  img.alt = ''; // no overlay text needed
  img.className = 'dynamictemplate-img';

  // 4. append into the block
  block.append(img);
}
