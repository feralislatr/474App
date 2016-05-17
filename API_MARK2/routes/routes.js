var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/deathTree';

//localhost:28107/getDeath
var appRouter = function(app) {
    app.get("/getDeath", function(req, res) {
        MongoClient.connect(url, function(err,db) {
	    assert.equal(null, err);
    	var collection = db.collection('tree');
        // get attributes like so: req.query.[attribute]
        //returns:
        //var returnbody = {"attribute":"value"}
        //return res.send(returnbody);
        return res.send(answerFinder(collection, req, 0));
	    db.close();
        });
    
    });
}

var answerFinder = function(collection, req, curID){
   /* JAVA VERSION
   if(n.isGoal()){
			switch (n.goalCategory()){
			case 1:
				System.out.println("Accident");
				break;
			case 2:
				System.out.println("Suicide");
				break;
			case 3:
				System.out.println("Homicide");
				break;
			case 4:
				System.out.println("Pending Investigation");
				break;
			case 5:
				System.out.println("Could not determine");
				break;
			case 6:
				System.out.println("Self-Inflicted");
				break;
			case 7:
				System.out.println("Natural");
				break;
			}
			return;
		}
		int feature = n.getFeature();
		double splitval = n.getSplitVal();
		if(d.getFeatures()[feature]<=splitval){
			PrintAnswerHelper(n.getChildOne(),d);
		}else{
			PrintAnswerHelper(n.getChildTwo(),d);
		}
		*/
}
module.exports = appRouter;