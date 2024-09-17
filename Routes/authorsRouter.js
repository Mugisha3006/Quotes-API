import { Router } from 'express';
import { getallAuthors, createNewAuthor, loginAuthor, getAuthorById, updateAuthorById, deleteAuthorById } from '../Controllers/authorController.js';
import { authorSchema, validate } from "../Utils/data-validator.js";
import { verifyToken } from '../Utils/token-handler.js';

const router = Router()

router.get('/', verifyToken, getallAuthors)

router.post('/register', validate(authorSchema), createNewAuthor)

router.post('/login', loginAuthor)

router.get('/:id', verifyToken, getAuthorById)

router.patch('/:id', verifyToken, updateAuthorById)

router.delete('/:id', verifyToken, deleteAuthorById)

export default router;