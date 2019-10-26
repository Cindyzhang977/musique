const router = require('express').Router();
let Queue = require('../models/queue.model');

// Queue GET Route
router.route('/').get((req, res) => {
	Queue.find()
		.sort({date: -1})
		.then(queue => res.json(queue))
		.catch(err => res.status(400).json('Error ' + err));
});

// Queue GET Route partyCode
// router.route('/latestCode/').get((req, res) => {
// 	Queue.find()
// 		.sort({time: -1})
// 		.limit(1)
// 		.then(queue => res.json(queue[0].partyCode))
// 		.catch(err => res.status(400).json('Error ' + err));
// });

// Queue GET Route partyCode retrivial (join-queue)
router.route('/getParty/').post((req, res) => {
	Queue.find({partyCode : req.body.partyCode})
		.then(queue => {
						queue[0].size = queue[0].size + 1;
						queue[0].save()
							.then(() => res.json(queue[0]))
							.catch(err => res.status(400).json('Error ' + err));
					})
		.catch(err => res.status(400).json('Error ' + err));
});


// Queue GET Route by ID
router.route('/:id').get((req, res) => {
	Queue.findById()
		.then(queue => res.json(queue))
		.catch(err => res.status(400).json('Error ' + err));
});

// Queue ADD Route > return partyCode string (create-queue)
router.route('/add').post((req, res) => {
	const newQueue = new Queue({
		'partyCode': req.body.partyCode,
		'queue' : [],
		'size': 1,
	});

	newQueue.save()
		.then(queue => res.json(queue.partyCode))
		.catch(err => res.status(400).json('Error ' + err));
});

// Queue UPDATE Route
// router.route('/update/:id').post((req, res) => {
// 	Queue.findById(req.params.id)
// 		.then(queue => {
// 			queue.partyCode = req.body.partyCode;
// 			queue.queue = req.body.queue;
// 		})
// });

// Queue DELETE Route
// router.delete('/delete/:id', (req, res) => {
// 	Queue.findByIdAndDelete(req.params.id)
// 		.then(() => res.json('Queue deleted'))
// 		.catch(err => res.status(404).json({sucess: false}));
// });

module.exports = router;
