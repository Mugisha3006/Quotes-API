import { Router } from 'express'
import { getallAuthors, createNewAuthor, getAuthorById, updateAuthorById, deleteAuthorById } from '../Controllers/authorController.js'

const router = Router()

router.get('/', getallAuthors)

router.post('/', createNewAuthor)

router.get('/:id', getAuthorById)

router.patch('/:id', updateAuthorById)

router.delete('/:id', deleteAuthorById)

export default router