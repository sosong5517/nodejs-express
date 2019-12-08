const Province = require("../../models").Province;

function responseMessage(code, message, data) {
    return {
        code: code,
        message: message,
        data: data
    }
}

function successMessage(data) {
    return responseMessage(0, null, data)
}

function errorMessage(code, message) {
    return responseMessage(code, message, null)
}

var Controller = function () { }

Controller.find = function (req, res) {
    var code = req.params.code
    Province.findOne({ where: { code: code } }).then(entity => {
        if (entity) {
            res.json(successMessage(entity))
        } else {
            throw 'Province not found';
        }
    }).catch(error => {
        res.json(errorMessage(500, error.message))
    })
}

Controller.findAll = function (req, res) {
    Province.findAll().then(entities => {
        res.json(successMessage(entities))
    }).catch(error => {
        res.json(errorMessage(500, error.message))
    })
}
