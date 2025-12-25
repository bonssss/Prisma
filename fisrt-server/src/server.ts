
// pure node code server example
// import { createServer, IncomingMessage, ServerResponse } from "http";

// const server = createServer((req: IncomingMessage, res: ServerResponse) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello, World!\n");
// });

// server.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

// express server example
import express from "express";
import type { Request, Response } from "express";
const app = express()

app.get("/", (req:Request, res:Response) => {
  res.send("Hello, World! This is an Express server.");
});

app.get("/api/data", (req:Request, res:Response) => {
  res.json([{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }]);
});

app.post("/api/data", (req:Request, res:Response) => {
  const newItem = { id: 3, name: "Item 3" };
  res.status(201).json(newItem);
});

// serving static files
app.use(express.static("public"));

// start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});