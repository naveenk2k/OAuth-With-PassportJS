const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining what each entry in the database would look like
const userSchema = new Schema({
    username: String,
    googleID: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;