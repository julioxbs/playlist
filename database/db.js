const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to DB!");
    }).catch((err) => console.log(err))
}

module.exports = connectToDB;