(function() {
  var APP_PORT, Bot, FB_TOKEN, FB_VERIFY, _, http, request;

  http = require("http");

  Bot = require("messenger-bot");

  _ = require("underscore");

  request = require("request");

  FB_TOKEN = process.env.FB_TOKEN;

  FB_VERIFY = process.env.FB_VERIFY;

  APP_PORT = process.env.PORT || 5000;

  (function() {
    var bot;
    bot = new Bot({
      "token": FB_TOKEN,
      "verify": FB_VERIFY
    });
    bot.on("error", function(err) {
      return console.log("boterr:", err);
    });
    bot.on("message", function(payload, reply) {
      var apiQuery, apiRequest, messageText;
      console.log("Received message from " + payload.sender.id, payload);
      messageText = payload.message.text;
      if (messageText(startsWith("rowell search for "))) {
        reply({
          "text": "Hi there! Hmmm.. Wait a moment.."
        });
        apiQuery = messageText.split("rowell search for ")[1];
        apiRequest = "http://partner.become.co.jp/json?partner=become&filter=All&image_size=200&num=1&start=1&q=" + yukata;
        return request.get(requestLocationUrl, function(err, resp, body) {
          var apiResponse, offer, replyBody, result;
          if (err || resp.statusCode !== 200) {
            throw "devlog: Encountered an error during become partner api call.";
          }
          apiResponse = JSON.parse(body);
          result = apiResponse.service_response.service_response.results.result[0];
          if (result) {
            offer = {
              "title": "" + result.title,
              "subtitle": "¥" + result.max_price,
              "image_url": "" + result.image_url,
              "buttons": [
                {
                  "type": 'web_url',
                  "title": 'View Offer',
                  "url": "" + result.merchant.url
                }, {
                  "type": 'web_url',
                  "title": 'Search More',
                  "url": "www.become.co.jp/" + apiQuery + ".html"
                }
              ]
            };
            replyBody = {
              "attachment": {
                "type": "template",
                "payload": {
                  "template_type": "generic",
                  "elements": [offer]
                }
              }
            };
            return reply(replyBody);
          } else {
            return reply({
              "text": "Sorry but I can't find any offer for " + apiQuery
            });
          }
        });
      } else {
        return reply({
          "text": "Sorry but I can't understand what you're saying. Let me think for a while then I'll get back to you."
        });
      }
    });
    return http.createServer(bot.middleware()).listen(APP_PORT, function() {
      return console.log("Server running on PORT " + APP_PORT);
    });
  })();

}).call(this);

//# sourceMappingURL=app.js.map
