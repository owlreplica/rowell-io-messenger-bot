(function() {
  var APP_PORT, Bot, FB_TOKEN, FB_VERIFY, _, http;

  http = require("http");

  Bot = require("messenger-bot");

  _ = require("underscore");

  FB_TOKEN = "EAAD0bZCsIRcsBAD7t09FFtJj2pOhGxSbpZCcVZAcWQRZCorcDZBVQgXAuyenRd4ebBN9ZADvorWyli6ZCYImSaE4KhzAQG4qZBY3IflZCftjrjz0yvpisRM1G9R74yPUDbnc0lIFqI8UWQ5JVZCJyIjGIN801OueQO8qoiXbJSwMLehgZDZD";

  FB_VERIFY = "password123";

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
      console.log("Received message from " + payload.sender.id, payload);
      return reply({
        "text": "Hi there, this is a messenger not made by Rowell!"
      });
    });
    return http.createServer(bot.middleware()).listen(APP_PORT, function() {
      return console.log("Server running on PORT " + APP_PORT);
    });
  })();

}).call(this);

//# sourceMappingURL=app.js.map
