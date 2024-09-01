import { Router } from 'express'
const router = Router()

import fs from 'node:fs'
import { getallAuthors, createNewAuthor, getAuthorById, updateAuthorById, deleteAuthorById } from '../Controllers/authorController.js'

// get requests

router.get('/', getallAuthors)
// post requests

router.post('/', createNewAuthor)

// get author by id
router.get('/:id', getAuthorById)

// update author by id 
router.patch('/:id', updateAuthorById)

// delete author by id 
router.delete('/:id', deleteAuthorById)

export default router