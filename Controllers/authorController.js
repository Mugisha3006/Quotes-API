import fs from 'node:fs'
import { PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes';


const prisma = new PrismaClient();

export const getallAuthors = async (req, res) => {
    try {
        const allAuthors = await prisma.author.findMany();

        // console.log(allAuthors)

        res.status(StatusCodes.OK).json({
            authors: allAuthors,
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
};

// create new Author
export const createNewAuthor = async (req, res) => {
    // Extracting 'author' and 'picture' directly from req.body
    const { author, picture } = req.body;

    try {
        // Creating a new author with the extracted data
        const newAuthor = await prisma.author.create({
            data: {
                author: author, // Use the actual author data
                picture: picture || "Author Image" // Default to "Author Image" if picture is not provided
            }
        });

        // Sending a response with the newly created author data
        res.status(StatusCodes.OK).json({
            author: newAuthor,
        });
    } catch (err) {
        // Sending an error response in case of an exception
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
};

// get specific author by id
export const getAuthorById = async (req, res) => {
    const idAuthor = parseInt(req.params.id, 10);
    try {
        const authorId = await prisma.author.findUnique({
            where: {
                id: idAuthor,
            }
        });

        res.status(StatusCodes.OK).json({
            author: authorId,
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
}

// update the existing author by id 
export const updateAuthorById = async (req, res) => {
    const { id } = req.params; // Extract the author ID from request parameters

    // validate the Id
    if (isNaN(Number(id))) {
        return res.status(400).send('Invalid author ID.');
    };

    try {
        // Update the author in the database using Prisma
        const updatedAuthor = await prisma.author.update({
            where: {
                id: Number(id), // Convert id to a number if it's not already (Prisma requires the correct type)
            },
            data: {
                ...req.body, // Spread the request body to update only the fields provided
            },
        });

        // If successful, return the updated author
        res.json(updatedAuthor);
    } catch (err) {
        console.error(err); //log the full error 
        
        // Check if the error is due to the author not being found
        if (err.code === 'P2025') { // P2025 is the Prisma error code for 'Record to update not found.'
            res.status(404).send('Author not found!');
        } else {
            // Handle other errors, such as database connection issues
            res.status(500).send('Failed to update author');
        }
    }
};

// delete author by id 
export const deleteAuthorById = async (req, res) => {
    // extract id from the req params
    const { id } = req.params
    try {
        // Convert the id to a number, if necessary (assuming id is stored as an integer)
        const authorId = parseInt(id, 10);

        // Delete the author from the database using Prisma
        const deletedAuthor = await prisma.author.delete({
            where: {
                id: authorId,
            },
        });

        // If the author is successfully deleted, send a success response
        res.json('Successfully deleted author');
    } catch (error) {
        // If an error occurs, check if it's because the author was not found
        if (error.code === 'P2025') {
            res.status(404).send('Author not found!');
        } else {
            // For other errors, send a generic failure response
            res.status(500).send('Failed to delete author');
        }
    }

};


