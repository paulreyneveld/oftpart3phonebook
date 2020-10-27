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

app.use(express.json());

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

app.post('/api/persons', (req, res) => {
    const person = req.body; 
    console.log(person);

    if (!person.name || !person.number) {
        return res.status(400).json({ "error": "name or number is missing" });
    }

    const nameExists = persons.find(individual => individual.name === person.name );
    if (nameExists) {
        return res.status(400).json({ "error": "name already exists" });
    }
    
    person.id = Math.floor(Math.random() * 10000); 
    persons = persons.concat(person);
    res.json(person);
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