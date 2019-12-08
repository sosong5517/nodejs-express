const Students = require("../../models").Student
var response = require("../controller/response")
const PDFMake = require("pdfmake")
const path = require("path")

var controller = function () { }
controller.find = function (req, res) {
    var id = req.params.id
    Students.findOne({ where: { id: id } }).then(entity => {
        if (entity) {
            res.json(response.message(entity))
        }
        else {
            throw 'student not found'
        }
    }).catch(error => {
        res.json(response.message(500, error.message))
    })
}
controller.findAll = function (req, res) {
    Students.findAll().then(entities => {
        res.json(response.message(entities))
    }).catch(error => {
        res.json(response.error(500, error.message))
    })
}
controller.downloadAll = function(req, res){
    Students.findAll().then(entities =>{
        var data =  entities.map((value)=>[value.id,value.name,value.nik])

        var pdfMake = new PDFMake({
            Roboto: {
                normal: path.resolve('assets', 'fonts', 'roboto', 'Roboto-Regular.ttf'),
                italics: path.resolve('assets', 'fonts', 'roboto', 'Roboto-Italic.ttf'),
                bold: path.resolve('assets', 'fonts', 'roboto', 'Roboto-Bold.ttf'),
            }
            
        })
        var doc = pdfMake.createPdfKitDocument({
            info: {
                title: 'PDF with External Image',
                author: 'Matt Hagemann',
                subject: 'PDF with External Image',
            },
            content: [
                {
                    style: 'tableExample',
                    table: {
                        widths:['*','*','*'],
                        body: [
                            [{text: 'id', style: 'tableHeader'},{text: 'name', style: 'tableHeader'}, {text: 'nik', style: 'tableHeader'}],
                            ...data
                        
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                        }
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                bigger: {
                    fontSize: 15,
                    italics: true
                },
                tableHeader:{
                    fontSize: 18,
                    bold: true
                }
            }
        })
    
        doc.end()
    
        res.setHeader('Content-type', 'application/pdf')
        res.setHeader('Content-disposition', 'attachment; filename="data-student.pdf"')
    
        doc.pipe(res)

    })
       // entities.map((e)={})
        //console.log(entities);
     // res.json((entities.map((value)=>{entities[0].id})))
     // dataTable.id;
        //data = entities.id
    
    
    

}

controller.Add =  function(req,res){
    var data = req.body
    console.log(data);
    
    Students.create(data).then(entities=>{
        res.json(response.success(entities))
    }).catch(error =>{
        res.json(response.error(500,error.message))
    })
}

controller.edit = function(req ,res){
    var data = req.body
    Students.findOne({where:{id: data.id}
    }).then(entity=>{
    if (entity) {
        return entity.update(data)
    }
        else{
            throw Error("Students not found")
        }
    }).then(entity =>{
        res.json(response.success(entity))
    }).then(entity=>{
        res.json(response.error(500,error.message))
    })
}
controller.delete = function(req,res){
    var data = req.body
    var dataId = req.params.id
    console.log(data);
    Students.findOne({where:{id:dataId}
    }).then(entity=>{
        if (entity) {
            entity.destroy(entity)
            res.json(response.success(entity))
        }
        else{
            throw Error("Students not found")
        }
    })
}
module.exports = controller
