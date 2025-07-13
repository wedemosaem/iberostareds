// dynamictemplate.js
export default function decorate(block) {
  block.classList.add('dynamictemplate');

  // 1. grab the Scene 7 URL from the editor text
  let src = block.textContent.trim();

  // 2. clear placeholder
  block.textContent = '';

  // 3. determine language and append the appropriate params
  const path = window.location.pathname;
  if (path.includes('/en/')) {
    const extraEn = '$titulo_p1=Summer%3A%20up%20to'
      + '&$pos_X_dto_val=-41.90'
      + '&$dcto_text=off'
      + '&$copy_ES=1'
      + '&$copy_DE=1'
      + '&$copy_EN=0';
    src += src.includes('?') ? `&${extraEn}` : `?${extraEn}`;
  } else if (path.includes('/de/')) {
    const extraDe = '$titulo_p1=Sommer%3A%20bis%20zu'
      + '&$pos_X_dto_val=-1'
      + '&$pos_X_DTO=200'
      + '&$dcto_text=Rabatt'
      + '&$copy_ES=1'
      + '&$copy_DE=0'
      + '&$copy_EN=1'
      + '&$cta_white=1';
    src += src.includes('?') ? `&${extraDe}` : `?${extraDe}`;
  } else if (path.includes('/es/')) {
    const extraEs = '$copy_ES=0'
      + '&$copy_DE=1';
    src += src.includes('?') ? `&${extraEs}` : `?${extraEs}`;
  }

  // 4. render as a responsive <img>
  const img = document.createElement('img');
  img.src = src;
  img.alt = '';
  img.className = 'dynamictemplate-img';

  block.append(img);
}
