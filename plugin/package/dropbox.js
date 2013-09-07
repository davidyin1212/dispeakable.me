APP_KEY = "j2q6r6vvd5g8ulm"

document.addEventListener('DOMContentLoaded', function () {
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

function setKey(uid,publickey){
  var person = {"uid": uid, "public": publickey};

  var new_friendlist = {'data':[]};
  var prev_friendlist = localStorage.getItem("friendlist");

  if (prev_friendlist == null){
    // if prev freindlist is null, then we add a new array.
  	new_friendlist.data.push(JSON.stringify(person));
    localStorage.setItem("friendlist", JSON.stringify(new_friendlist));

  }else {
    // if there's list already, then we get the localstorage item and add to it, store the new list.
    console.log(typeof prev_friendlist);
    //new_friendlist = prev_friendlist.push(JSON.stringify(person));
    
  }
  //console.log(new_friendlist.data.length);
  console.log(new_friendlist.data);
}