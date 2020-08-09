const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
//Database connection
const url = 'mongodb://localhost/food';

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Database connected...');
}).catch(err => {
  console.log('Connection failed...')
});




// Assets
app.use(express.static('public'))

// Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


// Routes 
require('./routes/web')(app)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

