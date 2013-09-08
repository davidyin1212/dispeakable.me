//TODO this is necessary during DEV, to reload bkg page
// var bkg = chrome.extension.getBackgroundPage();
// bkg.location.reload();
//reload code ends

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("getSelectionBtn").addEventListener('click', getSelectionHandler);
  document.getElementById('aesGenBtn').addEventListener('click', genAES);
  document.getElementById('addFriend').addEventListener('click', addFriend);
});


// Send message to background script
function getSelectionHandler() {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	  chrome.tabs.sendMessage(tabs[0].id, {method: "encrypt"}, 

      function(res){

        var selectedElements = $('#friendSelect option:selected');
        var encryptedMsgs = "Message by www.dispeakable.me\n";
        encryptedMsgs += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
        $.each(selectedElements, function(i, ele){
          var uid = $(ele).attr("data-uid");
          encryptedMsgs += uid + "\n";
          encryptedMsgs += encrypt(uid, res);
          encryptedMsgs += "\n";
          encryptedMsgs += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n";
          // console.log(encrypted);
          // console.log(decrypt(uid, encrypted));
        });
        console.log(encryptedMsgs);
        chrome.tabs.sendMessage(tabs[0].id, {method:"updateViewWithEncryptedMessage", encryptedMessage: encryptedMsgs});

	  });
	});
}

var genAES = function(e){
  var pass = $('#password').val();
  var me = localStorage.getItem('me');
  var enc = GibberishAES.enc(me, pass);
  $('#aes').html(enc);
  e.preventDefault();
}

var addFriend = function(e){
  var fname = $('#friend_name').val();
  var secret = $('#f_secretKey').val();
  var fPasskey = $('#fPasskey').val();

  var dec = GibberishAES.dec(fPasskey, secret);

  var obj = JSON.parse(dec);
  obj.name = fname;

  var flist = JSON.parse(localStorage.getItem('friends'));
  flist.push(obj);
  localStorage.setItem('friends', JSON.stringify(flist));

  var newFriend = $("<option></option>").attr("data-uid", obj.uid).html(fname);

  $("#friendSelect").append(newFriend);

  $('#friend_name').val("");
  $('#f_secretKey').val("");
  $('#fPasskey').val("");
  e.preventDefault();
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

//WILS AREA, STAY THE FUCK OUT!!!
// (function($){
  pageInitialized = false;
  $(function() {
    if(pageInitialized) return;
    pageInitialized = true;
    chrome.tabs.insertCSS(null, {file: "inject.css"});
    // Handler for .ready() called.
    var $goggles = $('#goggles');
    var mouseleft = false;
    $(document).on('mouseup', function(e){
      $goggles.css({
        'top': 33,
        'left': 29
      });
      if(e.pageX<0 || e.pageX>300 || e.pageY < 0 || e.pageY > 626){
        //TODO send message to background
        chrome.tabs.executeScript(null, {file: "spy_goggles.js"});
        $goggles.hide();
        // chrome.runtime.sendMessage({greeting: "potato"}, function(response) {        
        //   if(response.farewell == "banana"){
        //     $goggles.hide();
        //   }else{
        //     console.log(response.farewell);
        //   }
        // });
      }
      return false;
    });
    $goggles.draggable();
  });
// })(jQuery);

//END OF WILS AREA
