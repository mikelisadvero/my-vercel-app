document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('scraperToggle');
    const toggleLabel = document.getElementById('toggleLabel');
    const googleScraper = document.getElementById('googleScraper');
    const youtubeScraper = document.getElementById('youtubeScraper');
    
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            googleScraper.style.display = 'none';
            youtubeScraper.style.display = 'block';
            toggleLabel.textContent = 'YouTube Scraper';
        } else {
            googleScraper.style.display = 'block';
            youtubeScraper.style.display = 'none';
            toggleLabel.textContent = 'Google Scraper';
        }
    });
});
