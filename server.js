require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)


//Database connection
const url = 'mongodb://localhost/food';

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Database connected...');
}).catch(err => {
  console.log('Connection failed...')
});


// Session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: 'sessions'
})

// Session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookies: { maxAge: 1000 * 60 * 24 } // 24 hours
}))

app.use(flash())


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

