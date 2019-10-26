const router = require('express').Router();
let Host = require('../models/host.model');

// Host GET router
router.route('/').get((req, res) => {
	Host.find()
		.then(hosts => res.json(hosts))
		.catch(err => res.status(400).json('Error ' + err));
});

// Host GET router by ID
router.route('/:id').get((req, res) => {
	Host.findById(req.params.id)
		.then(hosts => res.json(hosts))
		.catch(err => res.status(400).json('Error ' + err));
});

// Host ADD router
router.route('/add').post((req, res) => {
	const newHost = new Host({
		'username': req.body.username,
		'code': req.body.code,
	});

	newHost.save()
		.then(() => res.json('Host created'))
		.catch(err => res.status(400).json('Error ' + err));
});

// Host DELETE router
router.route('/delete/:id').delete((req, res) => {
	Host.findByIdAndDelete(req.params.id)
		.then(() => res.json('Host deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));
});

// Host UPDATE router
router.route('/update/:id').post((req, res) => {
	Host.findById(req.params.id)
		.then(host => {
			host.username = req.body.username;
			host.code = req.body.code;

			host.save()
				.then(() => res.json('Host updated'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;