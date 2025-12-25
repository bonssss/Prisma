import express from "express";
const app = express()

app.get("/", (req, res) => {
  res.send("Hello, World! This is an Express server  hello broo.");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});