import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { createJWTToken } from "../Utils/token-handler.js";

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
    try {
        const { authorName, email, password, imageUrl } = req.body;

        // Check if the author with the given email already exists
        const existingAuthor = await prisma.author.findUnique({
            where: { email }
        });

        if (existingAuthor) {
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Author with email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new author
        const newAuthor = await prisma.author.create({
            data: {
                ...req.body,
                password: hashedPassword
            }
        });

        // Return success response
        res.status(StatusCodes.CREATED).json({
            message: "Author registered Successfully",
            author: { id: newAuthor.id, email: newAuthor.email, authorName: newAuthor.name },
        });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Error creating author:", err);

        // Return a generic error message to the client
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Unable to register author" });
    }
};

// login an author
const loginAuthor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Provide email and password" })
        }

        const author = await prisma.author.findUnique({
            where: {
                email
            },
        });

        console.log(`author ${author}`)

        const verifyPassword = bcrypt.compareSync(password, author.password);

        if (verifyPassword) {
            let data = { authorId: author.id, authorName: author.authorName }
            console.log(data)

            const token = createJWTToken(data);
            console.log(token)
            res.status(StatusCodes.CREATED).json({ message: "Author LoggedIn", token: token });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Author not found" })
        }
    } catch (err) {
        await prisma.$disconnect()
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Password or Email entered is incorrect. Login again" })
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

export { getallAuthors, createNewAuthor, loginAuthor, getAuthorById, updateAuthorById, deleteAuthorById }
