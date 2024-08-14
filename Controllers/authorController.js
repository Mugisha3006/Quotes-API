// const fs = require('node:fs')
import { Console } from 'node:console'
import fs from 'node:fs'


export const getallAuthors = (req, res)=>{
    fs.readFile('./Models/authors.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            res.json(JSON.parse(data))
        }
    })
}

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
export const getAuthorById = (req, res) => {
    // refer to an id query
    const { id } = req.params

    // read file
    fs.readFile('./Models/authors.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('Failed to get data')
        } else {
            const authors = JSON.parse(data) //all the authors
            const author = authors.find(a => a.id == id);
            if (author) {
                res.json(author)
            } else {
                res.send('Author not found!')
            }
        }
    })
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
            let authors = JSON.parse(data) //initial models data
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
                        fs.
                    }
                })
                // console.log(authors)
            } else {
                res.send('Authors not found!')
            }

        }
    })

}


// export default {
//     createNewAuthor,
//     getallAuthors,
//     getAuthorById,
//     updateAuthorById,
//     deleteAuthorById
// }