const fs = require('node:fs')

const getallAuthors = (req, res)=>{
    fs.readFile('./Models/authors.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            res.json(JSON.parse(data))
        }
    })
}

const createNewAuthor = (req, res)=>{

    let newAuthor = req.body

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
const getAuthorById = (req, res) => {
    // refer to an id
    const { id } = req.params
    // read file
    fs.readFile('./Models/authors.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('Failed to get data')
        } else {
            const authors = JSON.parse(data)
            const author = authors.find(a => a.id == id);
            if (author) {
                res.json(author)
            } else {
                res.send('Author not found!')
            }
        }
    })
}

module.exports = {
    createNewAuthor,
    getallAuthors,
    getAuthorById
}