import { Router } from 'express'
import fs from 'node:fs'
import { getallQuotes, createNewQuote, getQuoteById, UpdateQuoteById, deleteQuoteById } from '../Controllers/quoteController.js'

const router = Router()

// get requests
router.get('/', getallQuotes)

// post requests
router.post('/', createNewQuote)

// get quote by id
router.get('/:id', getQuoteById)

//patch
router.patch("/:id", UpdateQuoteById)

// delete existing quote by id
router.delete('/:id', deleteQuoteById)



export default router