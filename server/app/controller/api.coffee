"use strict"

module.exports = (settings, nconf, libs) ->

  app = libs.app
  dbox = require("dbox").app({ "app_key": "0xdlb1aoqgt4qe2", "app_secret": "o44ym3uxlsf0v53" })
  uuid = require('node-uuid')

  # RSA Key pair generation library
  RSA_INTERFACE = require './RSA'

  RSA = new RSA_INTERFACE()

  app.get '/keys', (req, res) ->
    RSA.create (ret) ->
      ret.uid = uuid.v4().replace /-/gm, ""
      res.send ret

      dbox.requesttoken (status, request_token) ->
        console.log request_token

  @