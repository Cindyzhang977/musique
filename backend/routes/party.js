const router = require('express').Router();
let Party = require('../models/party.model');

// Party GET Route
router.route('/').get((req, res) => {
	Party.find()
		.sort({date: -1})
		.then(party => res.json(party))
		.catch(err => res.status(400).json('Error ' + err));
});

// Party GET Route partyCode
// router.route('/latestCode/').get((req, res) => {
// 	Party.find()
// 		.sort({time: -1})
// 		.limit(1)
// 		.then(queue => res.json(queue[0].partyCode))
// 		.catch(err => res.status(400).json('Error ' + err));
// });

// Party GET Route partyCode retrivial (join-queue)
router.route('/getParty/').post((req, res) => {
	Party.find({partyCode : req.body.partyCode})
		.then(party => {
						console.log("party" + party);
						party[0].size = party[0].size + 1;
						party[0].save()
							.then(() => res.json(party[0]))
							.catch(err => res.status(400).json('Error ' + err));
					})
		.catch(err => res.status(400).json('Error ' + err));
});

// party GET > return number of users logged in
// router.route('/getSize/:id').get((req, res) => {
// 	console.log(req.params.id);
// 	Party.find({partyCode: req.params.id})
// 		.then(party => res.json(party))
// 		.catch(err => res.status(400).json('Error ' + err));
// });


// Party GET Route by ID
router.route('/:id').get((req, res) => {
	Party.findById(req.params.id)
		.then(party => res.json(party))
		.catch(err => res.status(400).json('Error ' + err));
});

// Party POST Route > return partyCode string (create-queue)
router.route('/addParty').post((req, res) => {
	const newParty = new Party({
		'partyCode': req.body.partyCode,
		'queue' : [],
		'size': 1,
	});

	newParty.save()
		.then(party => res.json(party._id))
		.catch(err => res.status(400).json('Error ' + err));
});

// party POST route > add song to party's queue
router.route('/addSong').post((req, res) => {
	Party.find({partyCode : req.body.partyCode})
		.then(party => {
			if (req.body.songID !== '') {
					party[0].queue.push(req.body.songID);
			}
				party[0].save()
					.then(() => res.json(party[0]))
					.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
});

// Party UPDATE Route
// router.route('/update/:id').post((req, res) => {
// 	Party.findById(req.params.id)
// 		.then(queue => {
// 			queue.partyCode = req.body.partyCode;
// 			queue.queue = req.body.queue;
// 		})
// });

// Party DELETE Route
// router.delete('/delete/:id', (req, res) => {
// 	Party.findByIdAndDelete(req.params.id)
// 		.then(() => res.json('Party deleted'))
// 		.catch(err => res.status(404).json({sucess: false}));
// });

module.exports = router;
