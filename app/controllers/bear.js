

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var Bear = require('../model/bear');	

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

router.route('/bears')
		    // create a bear (accessed at POST http://localhost:8080/api/bears)
	    .post(function(req, res) {
	        console.log(req.body);
	        console.log(req.body.name);
	        var bear = new Bear();      // create a new instance of the Bear model
	        bear.name = req.body.name;
	        bear.taxonomy = { specie: req.body.taxonomy.specie, popular_name: req.body.taxonomy.popular_name };
	        // save the bear and check for errors
	        bear.save(function(err) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'Bear created!' });
	        });
	        
	    })

	    .get(function(req, res){
    		Bear.find(function(err, bears){
    			if(err)
					res.send(err);

				res.json(bears);	
    		});
	    });

	router.route('/bears/:bear_id')

	    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	    .get(function(req, res) {
	        Bear.findById(req.params.bear_id, function(err, bear) {
	            if (err)
	                res.send(err);
	            res.json(bear);
	        });
	    })    

	    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

  
module.exports = router
