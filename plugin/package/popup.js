
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("getSelectionBtn").addEventListener('click', getSelectionHandler);
  //document.getElementById('lead').addEventListener('click', openPage);
  //document.getElementById('decryptBtn').addEventListener('click', decryptPage);
});


// Send message to background script
function getSelectionHandler() {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	  chrome.tabs.sendMessage(tabs[0].id, {method: "encrypt"}, 

      function(res){

        var selectedElements = $('#friendSelect option:selected');

        $.each(selectedElements, function(i, ele){
          var uid = $(ele).attr("data-uid");
          var encrypted = encrypt(uid, res);

          console.log(encrypted);

          // console.log(decrypt(uid, encrypted));
        });

	  });
	});
}

var decrypt = function(uid, msg){
  var flist = JSON.parse(localStorage.getItem('friends'));
  for (var _i = 0; _i < flist.length; _i++){
    if (flist[_i].uid === uid){
      var decrypt = new JSEncrypt({default_key_size : 2048});
      decrypt.setPrivateKey(flist[_i].private);
      return decrypt.decrypt(msg);
    }
  }

  var me = JSON.parse(localStorage.getItem('me'));
  var decrypt = new JSEncrypt({default_key_size : 2048});
  decrypt.setPrivateKey(me.private);
  return decrypt.decrypt(msg);
}

var encrypt = function(uid, msg){
  var flist = JSON.parse(localStorage.getItem('friends'));
  for (var _i = 0; _i < flist.length; _i++){
    if (flist[_i].uid === uid){
      var encrypt = new JSEncrypt({default_key_size : 2048});
      // TODO : Should be public key. Library bug?
      encrypt.setPrivateKey(flist[_i].private);
      // encrypt.setPublicKey(flist[_i].public);

      return encrypt.encrypt(msg);
    }
  }
}
