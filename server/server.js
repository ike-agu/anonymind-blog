const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require("./controllers/users");
server.use("/users", userRoutes);

const postRoutes = require("./controllers/posts");
server.use("/posts", postRoutes);

server.get("/", (req, res) => res.send("Welcome to Anonymind-blog share your anonymous thoughts"));

module.exports = server;
