const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello<h1/>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const countnum = persons.length;
const date = new Date();
app.get("/api/persons/info", (req, res) => {
  res.send(`<h2>Phonebook has info for ${countnum} people  <h2/><br/>${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  const query = Number(req.params.id);
  const filteredperson = persons.find((el) => el.id === query);
  console.log(filteredperson);
  if (filteredperson) {
    res.json(filteredperson);
  } else res.status(404).end("404");
});

app.delete("/api/persons/:id", (req, res) => {
  const query = Number(req.params.id);
  persons = persons.filter((el) => el.id !== query);
  //   console.log(persons);
  res.status(202).end();
});

const ID = Math.trunc(Math.random() * 100 + 1);
console.log(ID);
app.post("/api/persons", (req, res) => {
  const newNameandPhone = req.body;
  const number = newNameandPhone.number;

  if (!newNameandPhone.name || !number) {
    return res.status(404).json({ err: "The name or  number   is missing" });
  }

  const newObj = {
    id: ID,
    name: newNameandPhone.name,
    number: newNameandPhone.number,
  };

  persons = persons.concat(newObj);
  console.log(persons);
  res.json(newObj);
});

const port = 3001;
app.listen(port, () => console.log("Server is running"));
