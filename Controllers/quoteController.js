import { PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes';


const prisma = new PrismaClient();

// get all quotes
const getallQuotes = async (req, res)=>{
    try {
        const allQuotes = await prisma.quote.findMany();

        res.status(StatusCodes.OK).json({
            quotes: allQuotes,
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
}

// create a quote
const createNewQuote = async (req, res) => {
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
const getQuoteById = async (req, res) => {
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

// update a quote 
const UpdateQuoteById = async (req, res) => {
    try {
        const id = +req.params.id;
        const updatedQuote = await prisma.quote.update({
            where: {
                id
            },
            data: {
                ...req.body,
                authorId: +req.body.authorId
            }
        });
        res
            .status(StatusCodes.CREATED)
            .json({ message: "Quote updated", quote: updatedQuote });
    } catch (err) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({message:"Quote not updated", err})
   }
};


// delete quote by id 
const deleteQuoteById = async (req, res) => {
    // extract id from the req params
    let { id } = req.params
    try {
        // Convert the id to a number, if necessary (assuming id is stored as an integer)
        let quoteId = parseInt(id, 10);
    
        // Delete the quote from the database using Prisma
        const deletedQuote = await prisma.quote.delete({
            where: {
                id: quoteId,
            },
        });

        // If the quote is successfully deleted, send a success response
        res.json('Successfully deleted quote');
    } catch (error) {
        // If an error occurs, check if it's because the author was not found
        if (error.code === 'P2025') {
            res.status(StatusCodes.BAD_REQUEST).send('Quote not found!');
        } else {
            // For other errors, send a generic failure response
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to delete quote');
        }
    }

};

export { getallQuotes, createNewQuote, getQuoteById, UpdateQuoteById, deleteQuoteById }