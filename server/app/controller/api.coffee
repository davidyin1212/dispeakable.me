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

  RSA = new RSA_INTERFACE()

  app.get '/keys', (req, res) ->
    RSA.create (ret) ->
      res.send ret
      
  @