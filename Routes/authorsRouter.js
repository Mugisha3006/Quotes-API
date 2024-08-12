const express = require('express')
const router = express.Router()
const fs = require('node:fs')
const authorController = require('../Controllers/authorController')

// get requests

router.get('/', authorController.getallAuthors)
// post requests

router.post('/', authorController.createNewAuthor)

module.exports = router