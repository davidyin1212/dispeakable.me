//TODO this is necessary during DEV, to reload bkg page
// var bkg = chrome.extension.getBackgroundPage();
// bkg.location.reload();
//reload code ends

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("getSelectionBtn").addEventListener('click', getSelectionHandler);
  //document.getElementById('lead').addEventListener('click', openPage);
  document.getElementById('decryptBtn').addEventListener('click', decryptPage);
});


function decryptPage() {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, function(response){
      console.log("clicked");
      var myuid = JSON.parse(localStorage.getItem("me")).uid


      var encryptedMsg = response.data.split("\n");
      var nextIsUid = false;
      var parsedEncryptedMsg = ""
      console.log(encryptedMsg);
      for (var i in encryptedMsg) {
        // IF it's content parse the content
        if (nextIsUid) {
          console.log("=>  " + encryptedMsg[i]);
          if (myuid == encryptedMsg[i]) {
            console.log("found my uid damn!");
            i++;
            parsedEncryptedMsg = encryptedMsg[i];
            console.log(parsedEncryptedMsg);
            // At this point parsing is done, now decrypt and call contentscript
            var decryptedMsg = decrypt(myuid, parsedEncryptedMsg);
            console.log("Decrypted msg is :" + decryptedMsg);
            // Now communicate
            updateViewWithDecryptedMsg(decryptedMsg);

          }
          else {
            nextIsUid = false;
          }
        }
        if (encryptedMsg[i] == "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"){
          nextIsUid = true;
        }

      }

      // Now communicate to content script to update the view




    });
  });
}

function updateViewWithDecryptedMsg(decryptedMsg) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    return chrome.tabs.sendMessage(tabs[0].id, {method: "updateViewWithDecryptedMessage", decryptedMsg:decryptedMsg}, null);
  });
}

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
  // var me = JSON.parse(localStorage.getItem('me'));
  // var decrypt = new JSEncrypt({default_key_size : 2048});
  // decrypt.setPrivateKey(me.private);
  // return decrypt.encrypt(msg);
}

//WILS AREA, STAY THE FUCK OUT!!!
// (function($){
  pageInitialized = false;
  $(function() {
    if(pageInitialized) return;
    pageInitialized = true;
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
        chrome.runtime.sendMessage({greeting: "potato"}, function(response) {
          if(response.farewell == "banana"){
            $goggles.hide();
          }else{
            console.log(response.farewell);
          }
        });
      }
      return false;
    });
    $goggles.draggable();
  });
// })(jQuery);

//END OF WILS AREA
