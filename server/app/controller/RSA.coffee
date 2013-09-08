"use strict"

class RSA
  constructor: () ->
    @rsa = require 'rsa-json'

  create: (next) ->
    @rsa { bits : 2048}, (err, pair)  ->
      next('error') if err 
      # remove all new lines then callback
      # pair.public = pair.public.replace /\n/gm,""
      # pair.private = pair.private.replace /\n/gm,""
      next pair

module.exports = RSA