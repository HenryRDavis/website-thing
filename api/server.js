const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const userRouter = require('../users/user_router')
const authRouter = require('../auth/router')

const server = express()

const sessionConfiguration = {
    name: 'monster', // deafults to sid for the cookie name
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe!',
    cookie: {
      httpOnly: true, // true means js cant access the cookie
      maxAge: 1000 * 60 * 10, //expires after 10 mins
      secure: process.env.SECURE_COOKIES || false, // true means send cookies over https only
    },
    resave: false, //re save the seesion information even if there are no changes
    saveUninitialized: true, // read about the GDPR compliance
  }


server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfiguration))

 

// to test that the server is up and running
server.get('/', (req, res) => {
  res.status(200).send(`<h1> Server is Up and Running </h1>`)
})

server.use('/api/auth', authRouter);
server.use('/api/auth/users', userRouter);

module.exports = server;