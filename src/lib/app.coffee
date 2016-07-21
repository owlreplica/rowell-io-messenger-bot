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
    messageText = payload.message.text;
    if messageText is "What is today's offer?"
      replyBody = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "新作浴衣 浴衣セット 3点 10柄から選べる浴衣 さらに帯も選べる 送料無料 3,980円税込 浴衣福袋 浴衣 セット ゆ",
              "subtitle": "Become Japan",
              "image_url": "http://images.b-static.com/imageserver/s3/354540270-280-280-5-0/3-10-3-980.jpg",
              "buttons": [
                {"type": 'web_url', "title": 'View Offer', "url": "http://item.rakuten.co.jp/sweetangel/310014s-345b"},
                {"type": 'web_url', "title": 'Search More', "url": "www.become.co.jp/yukata.html"},
              ]
            }]
          }
        }
      }
      reply replyBody
    else
      reply  {"text": "Sorry but I can't understand what you're saying. Let me think for a while then I'll get back to you."}

  http.createServer bot.middleware()
      .listen APP_PORT, ()-> 
        console.log "Server running on PORT #{APP_PORT}"