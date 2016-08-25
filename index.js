'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
//const bot = require('node-wit').Wit
const bot = require('./bot.js')
const FB = require('./facebook.js')
// Setting up our bot
const wit = bot.getWit()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webcheck/', function (req, res) {
const messaging = FB.getFirstMessagingEntry(req.body);
  if (messaging && messaging.message) {
    // Yay! We got a new message!
    // We retrieve the Facebook user ID of the sender
    const sender = messaging.sender.id;
	console.log(messaging+sender);
    // We retrieve the user's current session, or create one if it doesn't exist
    // This is needed for our bot to figure out the conversation history
    const sessionId = findOrCreateSession(sender);
    // We retrieve the message content
    const msg = messaging.message.text;
    const atts = messaging.message.attachments;
    if (atts) {
      // We received an attachment
      // Let's reply with an automatic message
      FB.fbMessage(
        sender,
        'Sorry I can only process text messages for now.'
      );
    } else if (msg) {
      // We received a text message

      // Let's forward the message to the Wit.ai Bot Engine
      // This will run all actions until our bot has nothing left to do
      wit.runActions(
        sessionId, // the user's current session
        msg, // the user's message 
        sessions[sessionId].context, // the user's current session state
        (error, context) => {
          if (error) {
            console.log('Oops! Got an error from Wit:', error);
          } else {
            // Our bot did everything it has to do.
            // Now it's waiting for further messages to proceed.
            console.log('Waiting for futher messages.');
            // Based on the session state, you might want to reset the session.
            // This depends heavily on the business logic of your bot.
            // Example:
            // if (context['done']) {
            //   delete sessions[sessionId];
            // }
            // Updating the user's current session state
            sessions[sessionId].context = context;
			sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
          }
        }
      );
    }
  }
  res.sendStatus(200);
})
// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			if (text === 'Generic') {
				sendGenericMessage(sender)
				continue
			}
			getwit(event.message)
			//sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
			continue
		}
	}
	res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = "EAAR8dpi5Ae4BANlcMZB1rK2zgS0pUDwDVZCgXA64T389NQl2ycT8KZBniXGgebFBq9N3honekW6kIzbWix4NX1pWLDeykpaDcs7AUYI6B4ZBWJkFfg83lFpmIXhBADWXhatEq9ZAXT61dnM2J7YVmvT4efglZCqFXOS5zT9ctpSgZDZD"

function sendTextMessage(sender, text) {
	let messageData = { text:text }
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.messenger.com",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				}, {
					"title": "Second card",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}
function getwit(messaging)
{
//const messaging = FB.getFirstMessagingEntry(req.body);
  if (messaging && messaging.message) {
    // Yay! We got a new message!
    // We retrieve the Facebook user ID of the sender
    const sender = messaging.sender.id;
	console.log(messaging+sender);
    // We retrieve the user's current session, or create one if it doesn't exist
    // This is needed for our bot to figure out the conversation history
    const sessionId = findOrCreateSession(sender);
    // We retrieve the message content
    const msg = messaging.message.text;
    const atts = messaging.message.attachments;
    if (atts) {
      // We received an attachment
      // Let's reply with an automatic message
      FB.fbMessage(
        sender,
        'Sorry I can only process text messages for now.'
      );
    } else if (msg) {
      // We received a text message

      // Let's forward the message to the Wit.ai Bot Engine
      // This will run all actions until our bot has nothing left to do
      wit.runActions(
        sessionId, // the user's current session
        msg, // the user's message 
        sessions[sessionId].context, // the user's current session state
        (error, context) => {
          if (error) {
            console.log('Oops! Got an error from Wit:', error);
          } else {
            // Our bot did everything it has to do.
            // Now it's waiting for further messages to proceed.
            console.log('Waiting for futher messages.');
            // Based on the session state, you might want to reset the session.
            // This depends heavily on the business logic of your bot.
            // Example:
            // if (context['done']) {
            //   delete sessions[sessionId];
            // }
            // Updating the user's current session state
            sessions[sessionId].context = context;
			sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
			console.log(text.substring(0, 200));
          }
        }
      );
    }
  }
}
const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {
      fbid: fbid,
      context: {
        _fbid_: fbid
      }
    }; // set context, _fid_
  }
  return sessionId;
};

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
