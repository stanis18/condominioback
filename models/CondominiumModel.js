const mongoose = require('mongoose')

const  condominiumSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Condominium', condominiumSchema);