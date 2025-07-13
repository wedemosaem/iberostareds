// heroib.js
export default function decorate(block) {
    block.classList.add('heroib');
  
    // 1. pull in the 6 placeholders:
    const [
      imgHolder,
      titleHolder,
      dealHolder,
      promoHolder,
      cta1Holder,
      cta2Holder
    ] = Array.from(block.children);
  
    // 2. grab image URL
    const rawImg = imgHolder.querySelector('img');
    const src = rawImg
      ? rawImg.src
      : imgHolder.textContent.trim();
  
    // 3. grab rich‐text title HTML (preserve all markup)
    const titleHTML = titleHolder.innerHTML.trim();
  
    // 4. other texts (plain)
    const dealText  = dealHolder.textContent.trim();
    const promoText = promoHolder.textContent.trim();
    const cta1Text  = cta1Holder.textContent.trim();
    const cta2Text  = cta2Holder.textContent.trim();
  
    // 5. clear everything
    block.textContent = '';
  
    // 6. background image
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    block.append(img);
  
    // 7. title — inject your rich HTML directly
    const titleWrap = document.createElement('div');
    titleWrap.className = 'title';
    titleWrap.innerHTML = titleHTML;
    block.append(titleWrap);
  
    // 8. deal card
    const dealCard = document.createElement('div');
    dealCard.className = 'deal-card';
  
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = dealText;
  
    const h2 = document.createElement('h2');
    h2.textContent = promoText;
  
    const buttons = document.createElement('div');
    buttons.className = 'buttons';
  
    const btn1 = document.createElement('a');
    btn1.href = '#';
    btn1.className = 'btn primary';
    btn1.textContent = cta1Text;
  
    const btn2 = document.createElement('a');
    btn2.href = '#';
    btn2.className = 'btn secondary';
    btn2.textContent = cta2Text;
  
    buttons.append(btn1, btn2);
    dealCard.append(badge, h2, buttons);
    block.append(dealCard);
  }
  