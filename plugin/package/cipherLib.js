APP_KEY = "j2q6r6vvd5g8ulm"

document.addEventListener('DOMContentLoaded', function () {
  setMyKey();

  $('#friend_link').on('keyup', function(e) {
    if (e.keyCode === 13) {
    	clickHandler();

    }
  });
});


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
      setKey(data["uid"],data["public"]);
    }
  );
}

function setMyKey() {
    if (! localStorage.getItem("me")) {
    $.getJSON(
      "http://www.dispeakable.me/keys",
      function(data) {
        localStorage.setItem("me", JSON.stringify(data));
      }
    );
  }
}

function setFriendsKey(uid,publickey,name){

  var friendList;
  var person = {"uid": uid, "public": publickey};
  var uidExists = false;
  
  // Create object representing friendList in localStorage
  if (localStorage.getItem("friendList") == null) {
    friendList = [];
  }
  else {
    friendList = JSON.parse(localStorage.getItem("friendList"));
  }

  // First if uid exists in localStorage
  for (var i in friendList) {
    if (friendList[i]["uid"] == uid) {
      uidExists == true;
      break;
    }
  }

  if (! uidExists) {
    friendList.push(person);
  }

  // Now synchronize
  localStorage.setItem("friendList", JSON.stringify(friendList));


  // if (prev_friendlist == null){
  //   // if prev freindlist is null, then we add a new array.
  // 	new_friendlist.data.push(JSON.stringify(person));
  //   localStorage.setItem("friendlist", JSON.stringify(new_friendlist));

  // }else {
  //   // if there's list already, then we get the localstorage item and add to it, store the new list.
  //   console.log(typeof prev_friendlist);
  //   //new_friendlist = prev_friendlist.push(JSON.stringify(person));
    
  // }
  // //console.log(new_friendlist.data.length);
  // console.log(new_friendlist.data);
}