document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('scraperToggle');
    const googleScraper = document.getElementById('googleScraper');
    const youtubeScraper = document.getElementById('youtubeScraper');
    const container = document.querySelector('.container');
    
    toggle.addEventListener('change', function() {
        if (this.checked) {
            googleScraper.style.display = 'none';
            youtubeScraper.style.display = 'block';
            container.style.backgroundColor = '#ffcdd2';  // Light red for YouTube
        } else {
            googleScraper.style.display = 'block';
            youtubeScraper.style.display = 'none';
            container.style.backgroundColor = '#bbdefb';  // Light blue for Google
        }
    });
});
