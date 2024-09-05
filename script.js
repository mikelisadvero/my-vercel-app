document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('scraperToggle');
    const body = document.body;
    const googleScraper = document.getElementById('googleScraper');
    const youtubeScraper = document.getElementById('youtubeScraper');

    toggle.addEventListener('change', function() {
        if (this.checked) {
            googleScraper.classList.remove('active');
            youtubeScraper.classList.add('active');
            body.classList.remove('google');
            body.classList.add('youtube');
        } else {
            googleScraper.classList.add('active');
            youtubeScraper.classList.remove('active');
            body.classList.remove('youtube');
            body.classList.add('google');
        }
    });
});
