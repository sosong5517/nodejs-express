
var express = require('express')
var cors = require('cors')
var router = express.Router()
var BookController = require('../modules/controller/booksController')


router.use(
    cors(),
    function timeLog(req, res, next) {
        console.log('Time: ', Date.now())
        next()
    })
router.get('/download', BookController.downloadAll)
router.get('/', BookController.findAll)
router.post('/', BookController.Add)
router.get('/:id', BookController.find)
router.put('/:id', BookController.edit)
router.delete('/:id', BookController.delete)


module.exports = router