// dynamictemplate.js
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // 1. mark the block
  block.classList.add('dynamictemplate');

  // 2. grab the URL from the block's text content
  const src = block.textContent.trim();

  // 3. clear out the URL placeholder
  block.textContent = '';

  // 4. build an optimized <picture> exactly as before
  const picture = createOptimizedPicture(src, '', false, [
    { width: '1200' },
    { width: '800' },
    { width: '400' },
  ]);
  picture.classList.add('dynamictemplate-bg');

  // 5. append and you’re done
  block.append(picture);
}
