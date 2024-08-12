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

module.exports = {
    createNewAuthor,
    getallAuthors
}