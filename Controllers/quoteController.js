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
                        res.send("Quote added succesfully")
                }
            })
        }
    })
}

// get specific quote by id
export const getQuoteById = (req, res) => {
    // refer to an id query
    // const { id } = req.params

    // read file
    fs.readFile('./Models/quotes.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('Failed to get data')
        } else {
            const id = parseInt(req.params.id) 
            const quote = id.find(q => q.id === id);
            if (quote) {
                res.json(quote);
            } else {
                res.status(404).json({ message: "Quote not found" });
            }
        }
    })
}


// export default {
//     createNewQuote,
//     getallQuotes
// }