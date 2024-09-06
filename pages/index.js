import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [isYouTube, setIsYouTube] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [numResults, setNumResults] = useState('');
    const [sites, setSites] = useState('');

    const handleToggleChange = () => {
        setIsYouTube(!isYouTube);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!keyword || !numResults) {
            alert('Please fill in all required fields.');
            return;
        }

        const type = isYouTube ? 'youtube' : 'google';
        const body = JSON.stringify({ type, keyword, numResults, sites });

        try {
            const response = await fetch('/api/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body
            });
            const data = await response.json();
            console.log(data);
            alert('Scraping completed successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to process your request. Check the console for more information.');
        }
    };

    return (
        <>
            <Head>
                <title>Scraper Tool</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
            </Head>
            <div className={isYouTube ? 'youtube' : 'google'}> {/* Dynamic class application */}
                <div className="container">
                    <h4 className="center-align">Scraper Tool</h4>
                    <div className="switch center-align">
                        <label>
                            Google Scraper
                            <input type="checkbox" checked={isYouTube} onChange={handleToggleChange} />
                            <span className="lever"></span>
                            YouTube Scraper
                        </label>
                    </div>
                    
                    <div id="formContainer" className="card-panel z-depth-2">
                    <form onSubmit={handleSubmit}>
                        {/* Google Scraper Form */}
                        <div id="googleScraper" style={{ display: isYouTube ? 'none' : 'block' }}>
                            <div className="input-field">
                                <input type="text" id="googleKeyword" name="googleKeyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
                                <label htmlFor="googleKeyword" className={keyword ? 'active' : ''}>Keyword:</label>
                            </div>
                            
                            <div className="input-field">
                                <input type="number" id="googleResults" name="googleResults" value={numResults} onChange={e => setNumResults(e.target.value)} />
                                <label htmlFor="googleResults" className={numResults ? 'active' : ''}>Number of Results:</label>
                            </div>
                            
                            <div className="input-field">
                                <input type="text" id="googleSites" name="googleSites" value={sites} onChange={e => setSites(e.target.value)} />
                                <label htmlFor="googleSites" className={sites ? 'active' : ''}>Sites to Include (optional):</label>
                            </div>
                        </div>
                        
                        {/* YouTube Scraper Form */}
                        <div id="youtubeScraper" style={{ display: isYouTube ? 'block' : 'none' }}>
                            <div className="input-field">
                                <input type="text" id="youtubeKeyword" name="youtubeKeyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
                                <label htmlFor="youtubeKeyword" className={keyword ? 'active' : ''}>Keyword:</label>
                            </div>
                            
                            <div className="input-field">
                                <input type="number" id="youtubeResults" name="youtubeResults" value={numResults} onChange={e => setNumResults(e.target.value)} />
                                <label htmlFor="youtubeResults" className={numResults ? 'active' : ''}>Number of Results:</label>
                            </div>
                            {/* Add any other fields specific to YouTube here */}
                        </div>
                        <button className="btn waves-effect waves-light submit-btn" type="submit">Submit</button>
                    </form>
                </div>
                </div>
            </div>
        </>
    );
}
