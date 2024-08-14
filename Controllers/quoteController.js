import { readFile, writeFile } from 'node:fs'

export const getallQuotes = (req, res)=>{
    readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            res.json(JSON.parse(data))
        }
    })
}

export const createNewQuote = (req, res)=>{

    let newQuote = req.body

    // first get the content
    readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            writeFile('./Models/quotes.json', JSON.stringify([...JSON.parse(data), newQuote], null, 2), (err)=>{
                if (err){
                        res.send("Failed to add new quote")
                } else {
                        res.send("Author added succesfully")
                }
            })
        }
    })
}

// export default {
//     createNewQuote,
//     getallQuotes
// }