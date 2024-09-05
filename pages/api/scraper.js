// pages/api/scrape.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { type, keyword, numResults, sites } = req.body;

        try {
            const data = await runApifyActor(type, keyword, numResults, sites);
            const responseMessage = await writeToGoogleSheets(type, keyword, data);
            res.status(200).json({ message: responseMessage });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Failed to process request', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
