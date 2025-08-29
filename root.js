const child = require("child_process");
const cors = require("cors");
const crypto = require("crypto");
const crystal = require("crystals-kyber");
const express = require("express");
const fs = require("fs");
const http = require("http");
//const https = require("https");
const { Server } = require("socket.io");
const mysql = require("mysql2");
const os = require("os");
const path = require("path");
const php = require("node-php");
const tls = require("tls");
const url = require("url");
//const webpush = require("C:/Users/PMI/AppData/Local/Microsoft/TypeScript/5.7/node_modules/@types/web-push/index.d.ts");
const ws = require("ws");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const ipv4 = ()=>{
  var a = Object.entries(os.networkInterfaces());//eg: 192.168.3.9
  var addresObject = a[0][1][1].address;
  return addresObject;
}

console.log(ipv4());
const corsOptions = {
    credentials: true,
    origin: ["http://localhost:80","http://localhost:"]
}
/**
 * @description
*/
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get("/src/images/"+"*",(req, res)=>{
  res.sendFile(__dirname+"/src/images/"+req.url.split("/src/images/")[1]);
});
app.get("/src/documents/"+"*",(req, res)=>{
  console.log(req.url);
  res.sendFile(__dirname+"/src/documents/"+req.url.split("/src/documents/")[1]);
});
app.get("/src/modules/"+"*",(req, res)=>{
  console.log(req.url);
  res.sendFile(__dirname+"/src/modules/"+req.url.split("/src/modules/")[1]);
});
io.on("connection",(socket)=>{
    socket.on("connect_error", (error) => {
        if (socket.active) {
          // temporary failure, the socket will automatically try to reconnect
        } else {
          // the connection was denied by the server
          // in that case, `socket.connect()` must be manually called in order to reconnect
          console.log(error.message);
        }
      });
    console.log("has a user connected");
    socket.emit("conta",2+2);
});
//io.on("data",()=>{});
app.post("/",(req,res)=>{});
app.put("/",(req,res)=>{});
app.head("/",(req,res)=>{});
app.delete("/",(req,res)=>{});
app.patch("/",(req,res)=>{});
server.listen(80,ipv4()|"localhost",()=>{
  console.log("is running on " + ipv4() + ":" + 80);
});