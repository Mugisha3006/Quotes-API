import { Router } from 'express';
import { getallAuthors, createNewAuthor, getAuthorById, updateAuthorById, deleteAuthorById } from '../Controllers/authorController.js';
import {authorSchema, validate} from "../Utils/data-validator.js"
const router = Router()

router.get('/', getallAuthors)

router.post('/', validate(authorSchema), createNewAuthor)

router.get('/:id', getAuthorById)

router.patch('/:id', updateAuthorById)

router.delete('/:id', deleteAuthorById)

export default router