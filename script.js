document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('scraperToggle');
    const body = document.body;
    const googleScraper = document.getElementById('googleScraper');
    const youtubeScraper = document.getElementById('youtubeScraper');

    // Handle toggle between Google and YouTube scrapers
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

// Handle form submission
document.getElementById('scraperForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Determine scraper type
    const type = document.getElementById('scraperToggle').checked ? 'youtube' : 'google';

    // Get values from input fields
    const keyword = document.querySelector('.active #googleKeyword')?.value || document.querySelector('.active #youtubeKeyword')?.value;
    const numResults = document.querySelector('.active #googleResults')?.value || document.querySelector('.active #youtubeResults')?.value;
    const sites = document.getElementById('googleSites') ? document.getElementById('googleSites').value : '';

    // Validate required fields (e.g., keyword and numResults must not be empty)
    if (!keyword || !numResults) {
        alert('Please fill in all required fields.');
        return;
    }

    // Send data to the server
    fetch('/api/scrape', {  // Corrected URL to match Next.js API route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, keyword, numResults, sites })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Scraping completed successfully!');
    })
    .catch(error => console.error('Error:', error));
});