const express = require('express');
const app = express(); 

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456",
       
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5432123"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "432-123432"
    },
    {
        "id": 4,
        "name": "Mary Poppendiek",
        "number": "413-345432"
    },
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World');
})

app.get('/info', (req, res) => {
    let time = new Date();
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>
        `);
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);   
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);   
    persons = persons.filter(person => id !== person.id);
    res.status(204).end();
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})