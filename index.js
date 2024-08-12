const express = require('express');

const morgan = require('morgan');


const app = express();
const PORT = 3000;

// apply middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root url
app.get('/', (req, res) => {
    res.send('<h1>Quotes API<h1/>')
})

// start server
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})