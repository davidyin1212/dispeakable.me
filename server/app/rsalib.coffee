'use strict';

# cryptico = require './libs/cryptico.js'

class DISPEAK_KEYGEN
  
  # The length of the RSA key, in bits.
  BITS = 2048;

  GeneratePrivateKey : () ->
    cryptico.generateRSAKey("", BITS);

  GeneratePublicKey : (priaveteKey) ->
    cryptico.publicKeyString(priaveteKey);

  EncryptMsg : (publicKey, msg) ->
    cryptico.encrypt(msg, publicKey);

  DecryptMsg : (priavetKey, msg) ->
    cryptico.decrypt(msg, priavetKey);