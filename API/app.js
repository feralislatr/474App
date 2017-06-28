
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var url = 'mongodb://localhost:27017/deathTree';
var url = 'mongodb://data:27017/deathTree'; //changed for docker-compose //maybe take out port
var Node = require('./models/deathNode');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 4200; 


var router = express.Router();              

router.get('/', function(req, res) {
    res.json({ message: 'Hello World!' });   
});

router.route('/getDeath')

    .get(function(req, res) {
        console.log(req.body);
        MongoClient.connect(url, function(err,db) { //maybe use mongoose instead of mongoclient
	        assert.equal(null, err);
    	    var collection = db.collection('tree');
            // get attributes like so: req.query.[attribute]
            //returns:
            //var returnbody = {"attribute":"value"}
            //return res.send(returnbody);
            answerFinder(collection, req, 0, res);
            //res.json({ message: result});
    	    // db.close();
        });
    
    });

app.use('/api', router);

app.listen(port);
console.log('Listening on Port ' + port);



var answerFinder = function(collection, req, curID, res){
    
    
    var curNode;
    collection.findOne({_id:curID},function(err, item) {
        if (err)
            console.log(err);
        console.log("this is the current node")
        console.log(item);
        curNode = item;
        console.log("curnode id:"+curNode._id);
        if(curNode.goal){
        	res.setHeader("Access-Control-Allow-Origin", "*");
    		res.setHeader("Access-Control-Allow-Methods", "PUT, GET, OPTIONS, HEAD");
            console.log("goal:"+curNode.goalcategory);
            switch (curNode.goalcategory){
			    case 1:
				    res.json({ message:"Accident"});
				    break;
			    case 2:
				    res.json({ message:"Suicide"});
				    break;
			    case 3:
				    res.json({ message:"Homicide"});
				    break;
			    case 4:
				    res.json({ message:"Pending Investigation"});
				    break;
			    case 5:
				    res.json({ message:"Could not determine"});
			    case 6:
				    res.json({ message:"Self-Inflicted"});
				    break;
			    case 7:
				    res.json({ message:"Natural"});
		    	    break;
		        default:
		            res.json({ message:"Error"});
		            break;
		    }
	}else{
	    var curfeature = curNode.feature;
		var splitval = curNode.splitvalue;
		//console.log("req: "+req);
		if(req.param(curfeature.toString())<=splitval){
			return answerFinder(collection,req,curNode.lchild, res);
		}else{
			return answerFinder(collection,req,curNode.rchild, res);
		}
	}
    });
    
}

module.exports = router;
