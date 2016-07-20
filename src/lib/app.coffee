# @author rowellpica
http      = require "http"
Bot       = require "messenger-bot"
_         = require "underscore"
FB_TOKEN  = process.env.FB_TOKEN
FB_VERIFY = process.env.FB_VERIFY
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