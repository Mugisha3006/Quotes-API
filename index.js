import app from "./server.js";


const PORT = process.env.PORT || 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to this API!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
});