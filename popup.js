let cachedTexts = [];

async function getFallbackTexts() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const fallbackElements = document.querySelectorAll('.slider-item .fallback-text');
      return Array.from(fallbackElements).map(el => el.textContent.trim());
    }
  }, (results) => {
    const list = document.getElementById('textList');
    const texts = results[0].result;
    cachedTexts = texts;

    if (texts.length === 0) {
      list.innerHTML = "<li>No fallback-texts found</li>";
    } else {
      texts.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        list.appendChild(li);
      });
    }
  });
}

function downloadTextFile() {
  if (!cachedTexts.length) return;

  const blob = new Blob([cachedTexts.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'fallback-texts.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

document.getElementById('downloadBtn').addEventListener('click', downloadTextFile);

getFallbackTexts();
