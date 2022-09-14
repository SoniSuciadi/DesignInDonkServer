require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/index");
const handleError = require("./middlewares/handleError");
const server = require("http").createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", routes);
app.use(handleError);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
io.on("connection", (socket) => {
  // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
server.listen(port);
