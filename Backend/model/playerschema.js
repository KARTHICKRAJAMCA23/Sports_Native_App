var mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    contactnumber: String,
    gender: String,
    place: String,
    dateTime: String, 
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    height: String,
    weight: String,
    age: String,
    clubName: String,
    mentorName: String,
    contactNumber: String,
    teamName: String,
  });
  

module.exports = mongoose.model('Player', playerSchema); 
