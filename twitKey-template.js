var Twit = require('twit');

var keys = new Twit({
    consumer_key:         'xxxx',
    consumer_secret:      'xxxx',
    access_token:         'xxxx',
    access_token_secret:  'xxxx'
});

exports.twit = keys;