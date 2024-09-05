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
document.getElementById('scraperForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const type = document.getElementById('scraperToggle').checked ? 'youtube' : 'google';
    const keyword = document.querySelector('.active #googleKeyword').value || document.querySelector('.active #youtubeKeyword').value;
    const numResults = document.querySelector('.active #googleResults').value || document.querySelector('.active #youtubeResults').value;
    const sites = document.getElementById('googleSites') ? document.getElementById('googleSites').value : '';

    fetch('/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, keyword, numResults, sites })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});
