const express = require('express')
const morgan = require('morgan')
const authorRouter = require('./Routes/authorsRouter')
const quoteRouter = require('./Routes/quotesRouter')

const app = express()

// Middleware
app.use(morgan('dev'));
app.use(express.json())


// Router Middleware
app.use('/authors', authorRouter)
app.use('/quotes', quoteRouter)

app.get('/', (req, res) => {
    res.send("<h1 style='color:blue'>Welcome to this Server</h1>")
})


let PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
});