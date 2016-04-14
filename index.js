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

app.post('/webhook/', function (req, res) {
	console.log(req)
	res.sendStatus(200)
})

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
