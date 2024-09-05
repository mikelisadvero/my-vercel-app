document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('scraperToggle');
    const container = document.querySelector('.container');
    const googleScraper = document.getElementById('googleScraper');
    const youtubeScraper = document.getElementById('youtubeScraper');
    const googleSitesInput = document.querySelector('#googleScraper .input-field:last-child');

    // Initial check to set the correct background and visibility on load
    if (toggle.checked) {
        googleScraper.style.display = 'none';
        youtubeScraper.style.display = 'block';
        container.className = 'container youtube-bg';
        googleSitesInput.style.display = 'none'; // Hide Google-specific input
    } else {
        googleScraper.style.display = 'block';
        youtubeScraper.style.display = 'none';
        container.className = 'container google-bg';
        googleSitesInput.style.display = 'block'; // Show Google-specific input
    }

    toggle.addEventListener('change', function() {
        if (this.checked) {
            googleScraper.style.display = 'none';
            youtubeScraper.style.display = 'block';
            container.className = 'container youtube-bg';
            googleSitesInput.style.display = 'none'; // Hide Google-specific input
        } else {
            googleScraper.style.display = 'block';
            youtubeScraper.style.display = 'none';
            container.className = 'container google-bg';
            googleSitesInput.style.display = 'block'; // Show Google-specific input
        }
    });
});
