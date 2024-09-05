document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('scraperToggle');
    const container = document.querySelector('.container');
    const googleScraper = document.getElementById('googleScraper');
    const youtubeScraper = document.getElementById('youtubeScraper');
    const googleSitesInput = document.querySelector('#googleScraper .input-field:last-child');

    function updateUI() {
        if (toggle.checked) {
            googleScraper.style.display = 'none';
            youtubeScraper.style.display = 'block';
            container.className = 'container youtube-bg';
            googleSitesInput.style.display = 'none';
        } else {
            googleScraper.style.display = 'block';
            youtubeScraper.style.display = 'none';
            container.className = 'container google-bg';
            googleSitesInput.style.display = 'block';
        }
    }

    toggle.addEventListener('change', updateUI);
    updateUI(); // Ensure UI is correctly set on initial load
});
