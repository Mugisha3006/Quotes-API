import { readFile, writeFile, promises as fs } from 'node:fs'

export const getallQuotes = (req, res)=>{
    readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            res.json(JSON.parse(data))
        }
    })
}

export const createNewQuote = (req, res)=>{

    let newQuote = req.body

    // first get the content
    readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            writeFile('./Models/quotes.json', JSON.stringify([...JSON.parse(data), newQuote], null, 2), (err)=>{
                if (err){
                        res.send("Failed to add new quote")
                } else {
                        res.send("Quote added succesfully")
                }
            })
        }
    })
}

// get specific quote by id
export const getQuoteById = async (req, res) => {
    try {
        const data = await fs.readFile('./Models/quotes.json', 'utf-8');
        const id = parseInt(req.params.id, 10);
        const quotes = JSON.parse(data);
        
        const quote = quotes.find(q => q.id === id);
        // const filteredQuotes = quotes.filter(q => q.id === id);
        // const quote = filteredQuotes.length > 0 ? filteredQuotes[0] : undefined;
        // console.log(quote)
        if (quote) {
            res.json(quote);
        } else {
            res.status(404).json({ message: "Quote not found" });
        }
    } catch (err) {
        res.status(500).send('Failed to get data');
    }
};

// update the existing quote by id 
export const UpdateQuoteById = (req, res) => {
    const { id } = req.params;

    fs.readFile('./Models/quotes.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Failed to get data');
        }

        let quotes = JSON.parse(data);
        const quoteIndex = quotes.findIndex(q => q.id == id);

        if (quoteIndex !== -1) {
            // Merge existing quote data with the new data from req.body
            quotes[quoteIndex] = { ...quotes[quoteIndex], ...req.body };

            fs.writeFile('./Models/quotes.json', JSON.stringify(quotes, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Failed to update quotes');
                }

                res.json(quotes[quoteIndex]); // Return the updated quote
            });
        } else {
            res.status(404).json({ message: 'Quote not found!' });
        }
    });
};

