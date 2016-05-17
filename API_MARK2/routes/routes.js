var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/deathTree';


var appRouter = function(app) {
    app.get("/getDeath", function(req, res) {
        MongoClient.connect(url, function(err,db) {
	    assert.equal(null, err);
    	var collection = db.collection('tree');
        //STUFF
	    db.close();
        });
    
    });
}
module.exports = appRouter;