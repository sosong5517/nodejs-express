var express = require('express')
var cors = require('cors')
var router = express.Router()
var StudentController = require('../modules/controller/StudentsController')

router.use(
   cors(),
   function timeLog(req,res,next){
       console.log('Time:',Date.now())
       next()
   } )
router.get('/download', StudentController.downloadAll)
router.get('/', StudentController.findAll)
router.post('/', StudentController.Add)
router.get('/:id', StudentController.find)
router.put('/:id', StudentController.edit)
router.delete('/:id', StudentController.delete)
module.exports = router