const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); // Import the cors module

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/translate', async (req, res) => {
    try {
        const key = "cf7af8b86eeb4f62b630bc928498cc74";
        const endpoint = "https://api.cognitive.microsofttranslator.com";
        const location = "eastus";

        const translationResponse = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString(),
            },
            params: {
                'api-version': '3.0',
                // 'from': 'autodetect',
                'to': req.body.targetLanguage || 'en',
            },
            data: [{
                'text': req.body.text || ''
            }],
            responseType: 'json'
        });

        res.json(translationResponse.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
