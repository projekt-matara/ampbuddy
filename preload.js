const Promise = require('bluebird')
const fs = require('fs')
const amps = JSON.parse(fs.readFileSync('amps.json'))
const mongoose = Promise.promisifyAll(require('mongoose'))
const config = require('./config.js')

mongoose.Promise = require('bluebird')
mongoose
.connect(config.mongoUrl)
.then(response => {
  console.log('connected to mongo :-)')
})
.catch((err) => {
  console.log("Error connecting to Mongo")
  console.log(err)
})

const ampSchema = mongoose.Schema({
  name: String,
  genres: Array,
  image: String
})

const amp = mongoose.model('Amp', ampSchema)

amps.forEach(item => {
  amp.create(item, (err, result) => {
    if(err) {console.log(err)} else {console.log(item.name + " saved successfully!")}
  }) 
})