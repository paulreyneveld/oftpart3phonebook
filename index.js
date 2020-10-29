require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express(); 

// DB Connection
const Person = require('./models/person');
const { response } = require('express');

// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456",
       
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5432123"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "432-123432"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendiek",
//         "number": "413-345432"
//     },
// ]

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.get('/info', (req, res) => {
    let time = new Date();
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>
        `);
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(results => res.json(results));
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id).then(results => res.json(results));
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    console.log(body);
    console.log(body.name);
    if (body === undefined) {
        return response.status(400).json({ error: 'No content' });
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson);
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;   
    persons = persons.filter(person => id !== person.id);
    res.status(204).end();
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
