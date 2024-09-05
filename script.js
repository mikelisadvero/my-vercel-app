document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('scraperToggle');
    const container = document.querySelector('.container');
    const googleScraper = document.getElementById('googleScraper');
    const youtubeScraper = document.getElementById('youtubeScraper');

    toggle.addEventListener('change', function() {
        if (this.checked) {
            googleScraper.style.display = 'none';
            youtubeScraper.style.display = 'block';
            container.className = 'container youtube-bg';
        } else {
            googleScraper.style.display = 'block';
            youtubeScraper.style.display = 'none';
            container.className = 'container google-bg';
        }
    });
});
