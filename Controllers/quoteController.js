import { readFile, writeFile, writeFileSync, readFileSync } from 'node:fs'
import { PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes';


const prisma = new PrismaClient();

// get all quotes
export const getallQuotes = async (req, res)=>{
    try {
        const allQuotes = await prisma.quote.findMany();

        console.log(allQuotes)

        res.status(StatusCodes.OK).json({
            quotes: allQuotes,
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
}

export const createNewQuote = async (req, res) => {
    // extract 'quote' and 'category' directly from the req body
    let { quote, category, authorId  } = req.body;

    try {
        // creating a new quote with the extracted data
        const newQuote = await prisma.quote.create({
            data: {
                quote: quote,  //use the actual quote data
                category: category,
                authorId: authorId
            }
        });
        
        // sending a response with the newly created quote data
        res.status(StatusCodes.OK).json({
            quote: newQuote,
        });
    } catch (err) {
        // sending an error response in case of an exception
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }   

   
};

// get specific quote by id
export const getQuoteById = async (req, res) => {
    const quoteIndex = parseInt(req.params.id, 10);
    try {
        const quoteId = await prisma.quote.findUnique({
            where: {
                id: quoteIndex,
            }
        });

        res.status(StatusCodes.OK).json({
            quote: quoteId,
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
};


// update the existing quote by id 
export const UpdateQuoteById = async (req, res) => {
    const { id } = req.params; // extract the quote id
    // validate id
    if (isNaN(Number(id))) {
        return res.status(400).send('Invalid quote ID.');
    };
    try {
        // update the quote in the database using Prisma
        const updateQuote = await prisma.quote.update({
            where: {
                id: Number(id), //Convert id to a number if it's not already (Prisma requires the correct type)
            },
            data: {
                ...req.body, // spread the request body to update only the fields provided
            },
        });
        // if successful, return the updated author
        res.json(updateQuote);
    } catch (error) {
        console.error(error); //log the full error
        // Check if the error is due to the quote not being found
        if (error.code === 'P2025') { // P2025 is the Prisma error code for 'Record to update not found.'
            res.status(404).send('Quote not found!');
        } else {
            // Handle other errors, such as database connection issues
            res.status(500).send('Failed to update quote');
        } 
    }

   
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
