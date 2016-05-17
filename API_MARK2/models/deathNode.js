var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var nodeSchema   = new Schema({
    _id: Number,
    feature: Number,
    splitvalue: Number,
    goal: Boolean,
    lchild: Number,
    rchild: Number,
    goalcategory: Number
    
});

module.exports = mongoose.model('Node', nodeSchema);