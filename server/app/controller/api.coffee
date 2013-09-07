"use strict"

# module.exports = function(settings, nconf, libs){

#   var app = libs.app;

#   app.get('/keys', function)

#   return this;
# }

module.exports = (settings, nconf, libs) ->

  app = libs.app

  # RSA Key pair generation library
  RSA_INTERFACE = require './RSA'
  # simple_rsa_encrypt = require "simple_rsa_encrypt";

  RSA = new RSA_INTERFACE()
  # cipher = new simple_rsa_encrypt.RsaEncrypter()

  app.get '/keys', (req, res) ->
    RSA.create (ret) ->
      res.send ret


  # app.get '/encrypt', (req, res) ->


  @