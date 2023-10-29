import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const googleApiKey = process.env.GOOGLE_API_KEY

    if (req.method === 'GET') {

        // TODO：Invoke Google Custom Search Json API
        // see: https://developers.google.com/custom-search/v1/introduction
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ message: 'Query parameter "q" is required' });
        }

        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${googleApiKey}&cx=${googleCx}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching Google Custom Search API:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}