import { PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes';


const prisma = new PrismaClient();

const getallAuthors = async (req, res) => {
    try {
        const allAuthors = await prisma.author.findMany();

        res.status(StatusCodes.OK).json({
            authors: allAuthors,
        });
    } catch (err) {
        res.json({ message: "Can't get Authors!", err });
    }
};

// create new Author
const createNewAuthor = async (req, res) => {
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
const getAuthorById = async (req, res) => {
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
const updateAuthorById = async (req, res) => {
    try {
        const id = +req.params.id;
        const updatedAuthor = await prisma.author.update({
            where: {
                id
            },
            data: {
                ...req.body
            }
        });
        console.log(updatedAuthor)
        res
            .status(StatusCodes.CREATED)
            .json({ message: "Author updated", author: updatedAuthor });
    } catch (err) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({message:"Author not updated", err})
    }
};

// delete author by id 
const deleteAuthorById = async (req, res) => {
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
            res.status(StatusCodes.BAD_REQUEST).send('Author not found!');
        } else {
            // For other errors, send a generic failure response
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to delete author');
        }
    }

};

export { getallAuthors, createNewAuthor, getAuthorById, updateAuthorById, deleteAuthorById }
