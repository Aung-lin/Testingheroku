const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

const requestlogger = (request, response, next) => {
  console.log("Method :", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log(".......");
  console.log();
  next();
};

app.use(express.json());
app.use(requestlogger);
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello<h1/>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const ID = Number(req.params.id);

  const note = notes.find((el) => el.id === ID);
  console.log(note);

  if (note) res.json(note);
  else res.status(404).end();
});

const generateID = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((el) => el.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const note = req.body;

  if (!note.content) {
    return res.status(404).json({
      error: "Content is missing",
    });
  }

  const newnote = {
    content: note.content,
    id: generateID(),
    important: note.important || false,
    date: new Date(),
  };

  notes = notes.concat(newnote);
  console.log(notes);
  res.json(newnote);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoin" });
};

app.use(unknownEndpoint);

const port = process.env.PORT || 3001;
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     req.sendFile(path.resolve(__dirname, "bulid", "index.html"));
//   });
// }
app.listen(port, () => console.log("Server is running", port));
