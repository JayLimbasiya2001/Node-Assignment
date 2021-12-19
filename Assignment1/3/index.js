const express = require("express");
const app = express();
const http = require("http").Server(app).listen(3000);
const io = require("socket.io")(http);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
var cricketdata = require("./cricket.json");

app.get("/", (req, res) => {
  res.render("index");
});
io.on("connection", (socket) => {
  console.log("User is connected");
  // console.log(crickdata.innings[1].overs[1].deliveries[0]);
  socket.on("getData", (data) => {
    for (var i = 0; i < cricketdata.innings.length; i++) {
      console.log(i);
      if (cricketdata.innings[i].team == data.team) {
        // console.log(cricketdata.innings[i].overs[0].deliveries);
        console.log(cricketdata.innings[i].overs[data.overnumber].deliveries);
        socket.emit(
          "sendData",
          cricketdata.innings[i].overs[data.overnumber].deliveries
        );
        break;
      } else {
        socket.emit("sendData", []);
      }
    }
  });
});
// app.listen(3000, () => {
//   console.log("Connection success");
// });
