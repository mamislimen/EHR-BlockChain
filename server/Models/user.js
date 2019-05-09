var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var  PatientSchema = new Schema({
    username:{type:String},
    login:{type:String},
    password:{type:String},

});
module.exports = mongoose.model('patient',PatientSchema);
