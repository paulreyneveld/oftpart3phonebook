const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://oftUser:${password}@cluster0.4f5ai.mongodb.net/people-db?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);


if (process.argv.length < 3) {
    console.log("You must provide a password")
    process.exit(1);
}

else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("Phonebook");
        result.forEach(person => console.log(person.name, person.number));
        mongoose.connection.close();
    })
} 

else {
    const person = new Person ({
        name: process.argv[3],
        number: process.argv[4]
    });

    person.save().then(resulst => {
        console.log(`added ${person.name} number ${person.number} to phonebook`);
        mongoose.connection.close();
    })
}