require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express(); 

// DB Connection
const Person = require('./models/person');

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
    Person.findById(id)
    .then(results => {
        if (results) {
            res.json(results);
        }
        else {
            res.status(404).end();
        }
    })
    .catch(error => next(error));
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    console.log(body);
    console.log(body.name);
    if (body === undefined) {
        return res.status(400).json({ error: 'No content' });
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
    Person.findByIdAndRemove(id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error));
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.log(error.message);
    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
