import { Router } from 'express'
const router = Router()
import fs from 'node:fs'
import { getallQuotes, createNewQuote, getQuoteById, UpdateQuoteById } from '../Controllers/quoteController.js'

// get requests
router.get('/', getallQuotes)

// post requests
router.post('/', createNewQuote)

// get quote by id
router.get('/:id', getQuoteById)

// Update existing quote by id
router.put('/:id', UpdateQuoteById)

export default router