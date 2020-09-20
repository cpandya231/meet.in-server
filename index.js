let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("<h1>Hello man!</h1>");
});

io.on("connection", (socket) => {
  socket.on("Chat message", (msg) => {
    console.log(`Message ${msg} recieved`);
    io.emit("Chat message", msg);
  });

  socket.on("join_room", (room) => {
    console.log(`Joining room ${room}`);
    socket.join(room);
  });

  socket.on("message", (data) => {
    console.log(`Sending message ${data.text} to room ${data.to}`);
    socket.to(data.to).emit("message", data);
  });
});

http.listen(4000, () => {
  console.log("Listening on 4000!");
});
