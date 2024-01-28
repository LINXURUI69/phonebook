const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())
const port = 8080;

baseUrl = 'http://localhost:9999/persons';

app.get('/persons', async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from json-server:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/persons', async (req, res) => {
    try {
        const dataFromFrontend = req.body;
        console.log(dataFromFrontend);
        const response = await axios.post(baseUrl, dataFromFrontend);
        res.json(response.data);
    } catch (error) {
        console.error('Error posting data to json-server:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/persons/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const response = await axios.delete(`${baseUrl}/${id}`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Error deleting data from json-server:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Express server is running on port ${port}`);
});
