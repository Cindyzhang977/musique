const router = require('express').Router();
let Party = require('../models/party.model');

// Party GET Route
router.route('/').get((req, res) => {
	Party.find()
		.sort({date: -1})
		.then(party => res.json(party))
		.catch(err => res.status(400).json('Error ' + err));
});

// Party POST Route partyCode retrivial (join-queue)
router.route('/getParty/').post((req, res) => {
	Party.find({partyCode : req.body.partyCode})
		.then(party => {
						party[0].size = party[0].size + 1;
						party[0].save()
							.then(() => res.json(party[0]))
							.catch(err => res.status(400).json('Error ' + err));
					})
		.catch(err => res.status(400).json('Error ' + err));
});

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
router.route('/update/:id').post((req, res) => {
	Party.findById(req.params.id)
		.then(party => {
			party.size = req.body.size - 1;
			party.save()
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
});

// Party DELETE Route
// router.delete('/delete/:id', (req, res) => {
// 	Party.findByIdAndDelete(req.params.id)
// 		.then(() => res.json('Party deleted'))
// 		.catch(err => res.status(404).json({sucess: false}));
// });

module.exports = router;
