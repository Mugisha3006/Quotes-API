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


export const createNewAuthor = (req, res)=>{

    let newAuthor = req.body//from postman

    // first get the content
    fs.readFile('./Models/authors.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            fs.writeFile('./Models/authors.json', JSON.stringify([...JSON.parse(data), newAuthor], null, 2), (err)=>{
                if (err){
                        res.send("Failed to add new author")
                } else { 
                        res.send("Author added succesfully")
                }
            })
        }
    })
}

// get specific author by id
export const getAuthorById = async (req, res) => {
    const idAuthor = parseInt(req.params.id, 10);
    try {
        const authorId = await prisma.author.findUnique({
            where: {
                id: idAuthor,
            }
        });

        // console.log(authorId)

        res.status(StatusCodes.OK).json({
            author: authorId,
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
}

// update the existing author by id 
export const updateAuthorById = (req, res) => {
    // refer to an id query
    const { id } = req.params
    // read file
    fs.readFile('./Models/authors.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('Failed to get data')
        } else {
            let authors = JSON.parse(data) //initial models in json format
            const authorIndex = authors.findIndex(a => a.id == id)
            if (authorIndex !== -1) {
                authors[authorIndex] = { ...authors[authorIndex], ...req.body }
                // write data to the file
                fs.writeFile('./Models/authors.json', JSON.stringify(authors, null, 2), (err) => {
                    if (err) {
                        res.send('Failed to update authors')
                    } else {
                        res.json(authors[authorIndex])
                    }
                })
            } else {
                res.send('Authors not found!')
            }

        }
    })

}

// delete author by id 
export const deleteAuthorById = (req, res) => {
    // refer to an id query
    const { id } = req.params
    // read file
    fs.readFile('./Models/authors.json', 'utf-8', (err, data) => {
        
        if (err) {
            res.send('Failed to get data')
        } else {
            let authors = JSON.parse(data)
            // console.log(authors)
            const authorIndex = authors.findIndex(a => a.id == id) // the author to be deleted
            console.log(authors[authorIndex])
            if (authorIndex !== -1) {
                const newAuthors = authors.filter(a => a.id != id)
                console.log(newAuthors)
                
                // write data to the file
                fs.writeFile('./Models/authors.json', JSON.stringify(newAuthors, null, 2), (err) => {
                    if (err) {
                        res.send('Failed to update authors')
                    } else {
                        res.json('Successfully deleted author')
                    }
                })
                // console.log(authors)
            } else {
                res.send('Authors not found!')
            }

        }
    })

}


