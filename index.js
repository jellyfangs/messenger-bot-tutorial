var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

appget('/webhook/', function (req, res) {
	messaging_events = req.body.entry[0].messaging
	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i]
		sender = event.sender.id
		if (event.message && event.message.text) {
			text = event.message.text
		}
	}
	res.sendStatus(200)
})

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
