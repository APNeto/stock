require('dotenv').config()
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

const API_TOKEN = process.env.API_TOKEN

app.use(cors());

app.get('/api/stocks', async (req, res) => {
	const tickers = ['MBRF3', 'JBSS32'];
	try {
		const requests = tickers.map(ticker =>
			axios.get(`https://brapi.dev/api/quote/${ticker}?token=${API_TOKEN}`)
		);

		const responses = await Promise.all(requests);
		const stockData = responses.map(response => response.data.results[0]);

		res.json(stockData);
	} catch (error) {
		console.error("Error fetching stock data:", error.message);
		res.status(500).json({ error: 'Failed to fetch stock data' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
