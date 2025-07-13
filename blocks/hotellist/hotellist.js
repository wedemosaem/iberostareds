// allhotels.js
function checkDomain() {
    if (
        window.location.hostname.includes('hlx.page') ||
        window.location.hostname.includes('localhost')
    ) {
        return 'https://publish-p157306-e1665625.adobeaemcloud.com/';
    }
    return window.location.origin;
}
const AEM_HOST = checkDomain();

export default async function decorate(block) {
    block.classList.add('allhotels');

    // 1. read the limit parameter
    const limit = parseInt(block.textContent.trim(), 10);
    if (!limit) return;

    // 2. clear placeholder
    block.textContent = '';

    // 3. fetch hotel items
    const url = `${AEM_HOST}/graphql/execute.json/aem-demo-assets/ALL-hotels;limit=${limit}`;
    let items = [];
    try {
        const res = await fetch(url);
        const json = await res.json();
        items = json.data.hotelList.items;
    } catch (e) {
        return; // on error, do nothing
    }
    if (!items || items.length === 0) return;

    // 4. build grid container
    const grid = document.createElement('div');
    grid.className = 'slider-grid';

    items.forEach(item => {
        // slide wrapper
        const slide = document.createElement('div');
        slide.className = 'slide';

        // image container
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        const img = document.createElement('img');
        const thumb = item.thumbnail;
        img.src = thumb
            ? `${AEM_HOST}${thumb._path}`
            : '';
        img.alt = item.name;
        imgContainer.append(img);
        slide.append(imgContainer);

        // card content
        const card = document.createElement('div');
        card.className = 'card';

        // title + stars
        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        const starsSpan = document.createElement('span');
        starsSpan.textContent = '★★★★★';
        cardTitle.append(nameSpan, starsSpan);

        // location
        const locationDiv = document.createElement('div');
        locationDiv.className = 'location';
        locationDiv.textContent = item.location;

        // subline: use region or parse from location
        const region = item.region || item.location.split(' - ')[1] || '';
        const sublineDiv = document.createElement('div');
        sublineDiv.className = 'subline';
        sublineDiv.textContent = `N° 1 en ${region}`;

        // tags (not provided in sample—skip or customize)
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'tags';
        (item.tags || []).forEach(tagText => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tagText;
            tagsDiv.append(span);
        });

        // reviews
        const reviewsDiv = document.createElement('div');
        reviewsDiv.className = 'reviews';
        const taIcon = document.createElement('span');
        taIcon.className = 'ta-icon';
        taIcon.textContent = 'ℹ︎';
        const reviewCircles = document.createElement('div');
        reviewCircles.className = 'review-circles';
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('span');
            reviewCircles.append(dot);
        }
        const reviewText = document.createElement('div');
        reviewText.className = 'review-text';
        reviewText.textContent = `${item.reviewsCount || 0} opinions`;
        reviewsDiv.append(taIcon, reviewCircles, reviewText);

        // actions
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';
        ['Info', 'Photos', 'Map'].forEach(txt => {
            const action = document.createElement('div');
            action.className = 'action';
            const span = document.createElement('span');
            span.textContent = txt;
            action.append(span);
            actionsDiv.append(action);
        });

        // total structure
        const hr1 = document.createElement('hr');
        hr1.className = 'divider';
        const btn = document.createElement('button');
        btn.className = 'book-btn';
        btn.textContent = `Enjoy from ${item.price} €`;
        const priceInfo = document.createElement('div');
        priceInfo.className = 'price-info';
        priceInfo.textContent = 'room/night - taxes included';
        const hr2 = document.createElement('hr');
        hr2.className = 'divider';

        // footer
        const footer = document.createElement('div');
        footer.className = 'footer';
        const infoIcon = document.createElement('span');
        infoIcon.className = 'info-icon';
        infoIcon.textContent = 'ℹ︎';
        const p = document.createElement('p');
        p.textContent = item.footerText || '';
        footer.append(infoIcon, p);

        // assemble card
        card.append(
            cardTitle,
            locationDiv,
            sublineDiv,
            tagsDiv,
            reviewsDiv,
            actionsDiv,
            hr1,
            btn,
            priceInfo,
            hr2,
            footer
        );

        slide.append(card);
        grid.append(slide);
    });

    block.append(grid);
}
