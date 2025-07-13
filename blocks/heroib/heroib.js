// heroib.js
export default function decorate(block) {
    block.classList.add('heroib');

    // 1. pull in the 6 expected placeholders:
    //    [0] image URL holder, [1] title holder ("Destination Balearic Islands"),
    //    [2] deal badge text, [3] promo h2 text, [4] cta1 text, [5] cta2 text
    const [
        imgHolder,
        titleHolder,
        dealHolder,
        promoHolder,
        cta1Holder,
        cta2Holder,
    ] = Array.from(block.children);

    // 2. get the image URL (either an <img> or plain text)
    const rawImg = imgHolder.querySelector('img');
    const src = rawImg
        ? rawImg.src
        : imgHolder.textContent.trim();

    // 3. pull all the text params
    const titleText = titleHolder.textContent.trim();
    const dealText = dealHolder.textContent.trim();
    const promoText = promoHolder.textContent.trim();
    const cta1Text = cta1Holder.textContent.trim();
    const cta2Text = cta2Holder.textContent.trim();

    // 4. clear out the placeholders
    block.textContent = '';

    // 5. build the <img> background
    const img = document.createElement('img');
    img.src = src;
    img.alt = ''; // decorative
    block.append(img);

    // 6. title/subtitle split:
    //    assume the first word is the subtitle, the rest is the main heading
    const [sub, ...rest] = titleText.split(' ');
    const subtitle = sub;
    const heading = rest.join(' ');

    const titleWrap = document.createElement('div');
    titleWrap.className = 'title';
    const subEl = document.createElement('div');
    subEl.className = 'subtitle';
    subEl.textContent = subtitle;
    const h1 = document.createElement('h1');
    h1.textContent = heading;
    titleWrap.append(subEl, h1);
    block.append(titleWrap);

    // 7. deal card
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
