APP_KEY = "j2q6r6vvd5g8ulm"

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('keygetter').addEventListener('click', clickHandler);
});

console.log("chosen.")

// Send message to background script
function clickHandler() {
  var linkaddress = document.getElementById("linkbox") 
  var linkcontent = linkaddress.value
  // Read contents as string from given link.
  getContent(linkcontent);
  //testing file, https://dl.dropboxusercontent.com/u/2273579/pkfile

  /*
    local storage for chrome extensions folder/fs
    */
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
  var obj = {};
  obj["myuid"] = uid;
  obj["myprivate"] = privatekey;
  obj["mypublic"] = publickey;

  console.log(obj);
    
    localStorage.setItem("mykeys",JSON.stringify(obj));

    var getobjfromstoragesample = localStorage.getItem("mykeys");
    
    console.log(JSON.parse(getobjfromstoragesample));
    
}