var Twit = require('twit');

var keys = new Twit({
    consumer_key:         '',
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  ''
});

exports.twit = keys;