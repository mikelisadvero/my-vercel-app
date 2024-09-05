const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 3000;

// Path to your Google service account credentials
const credentials = require('./my-vercel-app-2f6ab594c6a1.json');

// Configure Google auth client
const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

// Get auth client for Google Sheets API
const googleClientPromise = auth.getClient();

app.use(bodyParser.json());

app.post('/scrape', async (req, res) => {
    const { type, keyword, numResults, sites } = req.body;

    try {
        const data = await runApifyActor(type, keyword, numResults, sites);
        const responseMessage = await writeToGoogleSheets(type, keyword, data);
        res.json({ message: responseMessage });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to process request', details: error.message });
    }
});

async function runApifyActor(type, keyword, numResults, sites) {
    const actorId = type === 'google' ? '52YojklHNAIElW3t8' : 'ptLGAfpjlMEmQildy';
    let apiUrl = `https://api.apify.com/v2/actor-tasks/${actorId}/run-sync-get-dataset-items`;
    let searchQuery = keyword;

    if (type === 'google' && sites) {
        const siteQuery = sites.split(',').map(site => `site:${site.trim()}`).join('+OR+');
        searchQuery += '+' + siteQuery;
    }

    const params = {
        keyword: searchQuery,
        numResults: numResults
    };

    const response = await axios.post(apiUrl, params, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer apify_api_PvQbzMF9kIDzbmD7lMFDEr0N0ofisS0wws91'
        }
    });

    return response.data; // Assuming response data is directly usable
}

async function writeToGoogleSheets(type, keyword, data) {
    const googleClient = await googleClientPromise;
    const googleSheetsApi = google.sheets({ version: 'v4', auth: googleClient });
    const sheetTitle = type === 'google' ? `Search: ${keyword}` : `YouTube: ${keyword}`;
    const headers = type === 'google' ? ['Title', 'URL'] : ['Title', 'URL', 'Subscribers', 'Video Views', 'Channel Title'];
    const values = data.map(item => type === 'google' ? [item.title, item.url] : [item.title, item.url, item.subscribers, item.views, item.channel]);

    const spreadsheet = await googleSheetsApi.spreadsheets.create({
        requestBody: {
            properties: {
                title: sheetTitle
            },
            sheets: [{
                properties: {
                    title: 'Data'
                }
            }]
        }
    });

    await googleSheetsApi.spreadsheets.values.append({
        spreadsheetId: spreadsheet.data.spreadsheetId,
        range: 'Data!A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [headers, ...values]
        }
    });

    return `Created new sheet: ${spreadsheet.data.spreadsheetUrl}`;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
