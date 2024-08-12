const fs = require('node:fs')

const getallQuotes = (req, res)=>{
    fs.readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            res.json(JSON.parse(data))
        }
    })
}

const createNewQuote = (req, res)=>{

    let newQuote = req.body

    // first get the content
    fs.readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            fs.writeFile('./Models/quotes.json', JSON.stringify([...JSON.parse(data), newQuote], null, 2), (err)=>{
                if (err){
                        res.send("Failed to add new quote")
                } else {
                        res.send("Author added succesfully")
                }
            })
        }
    })
}

module.exports = {
    createNewQuote,
    getallQuotes
}