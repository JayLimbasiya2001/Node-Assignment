function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  console.log(hour + " : " + min + " : " + sec);
  var t = setTimeout(function () {
    console.clear();
    currentTime();
  }, 1000);
}

currentTime();
