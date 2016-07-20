# @author rowellpica
http      = require "http"
Bot       = require "messenger-bot"
_         = require "underscore"
FB_TOKEN  = "EAAD0bZCsIRcsBAD7t09FFtJj2pOhGxSbpZCcVZAcWQRZCorcDZBVQgXAuyenRd4ebBN9ZADvorWyli6ZCYImSaE4KhzAQG4qZBY3IflZCftjrjz0yvpisRM1G9R74yPUDbnc0lIFqI8UWQ5JVZCJyIjGIN801OueQO8qoiXbJSwMLehgZDZD"
FB_VERIFY = "password123"
APP_PORT  = process.env.PORT || 5000

do ->
  bot = new Bot { "token": FB_TOKEN, "verify": FB_VERIFY }

  bot.on "error", (err)->
    console.log "boterr:", err

  bot.on "message", (payload, reply)->
    console.log "Received message from #{payload.sender.id}", payload
    reply  {"text": "Hi there, this is a messenger not made by Rowell!"}

  http.createServer bot.middleware()
      .listen APP_PORT, ()-> 
        console.log "Server running on PORT #{APP_PORT}"