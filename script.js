const tickerData = {
  stocks: [
    { symbol: 'AAPL', price: '271.84', change: '+1.92%', direction: 'up' },
    { symbol: 'NVDA', price: '202.44', change: '-0.86%', direction: 'down' },
    { symbol: 'TSLA', price: '404.18', change: '+3.91%', direction: 'up' },
    { symbol: 'PLTR', price: '147.22', change: '-1.14%', direction: 'down' },
    { symbol: 'COIN', price: '312.67', change: '+2.27%', direction: 'up' },
    { symbol: 'AMD', price: '207.38', change: '-0.63%', direction: 'down' }
  ],
  memes: [
    { symbol: 'BONK', price: '18.42', change: '+12.84%', direction: 'up' },
    { symbol: 'WIF', price: '27.88', change: '+9.41%', direction: 'up' },
    { symbol: 'POPCAT', price: '14.36', change: '+6.24%', direction: 'up' },
    { symbol: 'BOME', price: '11.92', change: '-0.84%', direction: 'down' },
    { symbol: 'PENGU', price: '21.47', change: '+8.17%', direction: 'up' },
    { symbol: 'FARTCOIN', price: '33.10', change: '+18.22%', direction: 'up' }
  ]
};

const tickerTracks = document.querySelectorAll('[data-ticker]');
const updatedAt = document.querySelector('[data-updated-at]');
const copyButton = document.querySelector('[data-copy-target]');
const contractAddress = document.getElementById('contractAddress');
const pumpLinks = document.querySelectorAll('[data-pump-link]');

function renderTicker(track, items) {
  const isMemeTicker = track.dataset.ticker === 'memes';

  for (let index = 0; index < 2; index += 1) {
    const set = document.createElement('div');
    set.className = 'market-set';

    if (index === 1) {
      set.setAttribute('aria-hidden', 'true');
    }

    items.forEach((item) => {
      const quote = document.createElement('span');
      quote.className = `quote-item${isMemeTicker ? ' quote-item-meme' : ''}`;
      quote.innerHTML = `
        <span class="quote-symbol">${item.symbol}</span>
        <span class="quote-price">${item.price}</span>
        <span class="quote-change quote-change-${item.direction}">${item.change}</span>
      `;
      set.appendChild(quote);
    });

    track.appendChild(set);
  }
}

tickerTracks.forEach((track) => {
  const items = tickerData[track.dataset.ticker];

  if (items) {
    renderTicker(track, items);
  }
});

if (updatedAt) {
  updatedAt.textContent = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date());
}

const text = contractAddress ? contractAddress.textContent.trim() : '';
const hasRealCA = text && !/coming|drops|paste|soon|tbd|syncing|give the site|appear here|moment to push|paste_the_moom_ca|ca_goes_here/i.test(text);

if (hasRealCA) {
  const pumpUrl = `https://pump.fun/coin/${encodeURIComponent(text)}`;

  pumpLinks.forEach((link) => {
    link.href = pumpUrl;
  });
}

if (copyButton) {
  if (!hasRealCA) {
    copyButton.disabled = true;
    copyButton.textContent = 'Add CA';
  } else {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = 'Copied';

        window.setTimeout(() => {
          copyButton.textContent = 'Copy CA';
        }, 1400);
      } catch (error) {
        copyButton.textContent = 'Copy Failed';
      }
    });
  }
}
