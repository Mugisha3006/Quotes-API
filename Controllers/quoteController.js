import { readFile, writeFile, writeFileSync, readFileSync } from 'node:fs'
import { PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes';


const prisma = new PrismaClient();

export const getallQuotes = async (req, res)=>{
    try {
        const allQuotes = await prisma.quote.findMany();

        // console.log(allQuotes)

        res.status(StatusCodes.OK).json({
            quotes: allQuotes,
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
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
export const getQuoteById = (req, res) => {
    const data = readFileSync('./Models/quotes.json', 'utf-8');
    const id = parseInt(req.params.id, 10);
    // console.log(id)
    // const quotes = JSON.parse(data);
    // const quoteIndex = quotes.findIndex(q => q.id === id);
    // console.log(quotes[quoteIndex])
   
    try {
        const data = readFileSync('./Models/quotes.json', 'utf-8');
        // console.log(data)
        const id = parseInt(req.params.id, 10);
        const quotes = JSON.parse(data);
        
        const quoteIndex = quotes.findIndex(q => q.id === id);
        const quote = quoteIndex >= 0 ? quotes[quoteIndex] : undefined;
        
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

    readFile('./Models/quotes.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Failed to get data');
        }

        let quotes = JSON.parse(data);
        console.log(quotes)
        const quoteIndex = quotes.findIndex(q => q.id == id);
        console.log(quoteIndex)
        if (quoteIndex >= 0) {
            // Merge existing quote data with the new data from req.body
            let changedQuote = { ...quotes[quoteIndex], ...req.body };
            console.log(changedQuote)
            writeFileSync('./Models/quotes.json', JSON.stringify(quotes, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Failed to update quotes');
                }

                res.send("updated"); // Return the updated quote
            });
        } else {
            res.status(404).json({ message: 'Quote not found!' });
        }
    });
};


// delete author by id 
export const deleteQuoteById = (req, res) => {
    // refer to an id query
    const { id } = req.params
    // read file
    readFile('./Models/quotes.json', 'utf-8', (err, data) => {

        if (err) {
            res.send('Failed to get data')
        } else {
            let quotes = JSON.parse(data)
            console.log(quotes)
            const quoteIndex = quotes.findIndex(a => a.id == id) // the author to be deleted
            console.log(quotes[quoteIndex])
            if (quoteIndex !== -1) {
                const newquotes = quotes.filter(a => a.id != id)
                console.log(newquotes)

                // write data to the file
                writeFileSync('./Models/quotes.json', JSON.stringify(newquotes, null, 2), (err) => {
                    if (err) {
                        res.send('Failed to update quotes')
                    } else {
                        res.send('Successfully deleted author')
                    }
                })
                // console.log(quotes)
            } else {
                res.send('quotes not found!')
            }

        }
    })

}
