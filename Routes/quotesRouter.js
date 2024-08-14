import { Router } from 'express'
const router = Router()
import fs from 'node:fs'
import { getallQuotes, createNewQuote } from '../Controllers/quoteController.js'

// get requests
router.get('/', getallQuotes)

// post requests
router.post('/', createNewQuote)

export default router