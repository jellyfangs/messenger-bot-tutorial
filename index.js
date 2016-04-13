var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))

app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === '<validation_token>') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
