"use strict"

module.exports = (settings, nconf, libs) ->

  app = libs.app

  uuid = require('node-uuid');

  # RSA Key pair generation library
  RSA_INTERFACE = require './RSA'

  RSA = new RSA_INTERFACE()

  app.get '/keys', (req, res) ->
    RSA.create (ret) ->
      ret.uid = uuid.v4().replace /-/gm, ""
      res.send ret

  @