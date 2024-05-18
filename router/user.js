const express = require('express')
const User = require('../controller/user')
const router = express.Router()

router.get('/',User.getAll)
router.post('/',User.create)
router.post('/search',User.getUser)

module.exports = router