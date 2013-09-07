"use strict"

class RSA
  constructor: () ->
    @rsa = require 'rsa-json'

  create: (next) ->
    @rsa { bits : 2048}, (err, pair)  ->
      next('error') if err 
      next pair

module.exports = RSA