const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.DB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => console.log('Conected to DB'))
    .catch(error => console.log('Failed to connect', error.message))

const personSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    number: String
})

personSchema.plugin(uniqueValidator)


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema);
