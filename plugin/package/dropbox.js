APP_KEY = "j2q6r6vvd5g8ulm"

document.addEventListener('DOMContentLoaded', function () {
  $('#friend_link').on('keyup', function(e) {
    if (e.keyCode === 13) {
    	clickHandler();
    }
  });
});

console.log("chosen.")

// Send message to background script
function clickHandler() {
  var linkaddress = document.getElementById("friend_link") 
  var linkcontent = linkaddress.value
  // Read contents as string from given link.
  getContent(linkcontent);
}

function getContent(theUrl){
  $.getJSON(
    theUrl,
    function(data) {
      setKey(data["uid"],data["private"],data["public"]);
    }
  );
}

function setKey(uid,privatekey,publickey){
  var person = {};
  person["uid"] = uid;
  person["public"] = publickey;

  var prev_friendlist = localStorage.getItem("friendlist");
  var new_friendlist = [];

  if (prev_friendlist == null){
  	new_friendlist.push(JSON.stringify(person));
  }else {
  	new_friendlist = prev_friendlist.push(JSON.stringify(person));
  }
  localStorage.setItem("friendlist", new_friendlist);



}