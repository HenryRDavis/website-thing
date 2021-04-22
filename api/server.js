const express = require('express')
const helmet = require('helmet')

const server = express();

const sessionConfiguration = {
  name: 'monster',
  secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe!',
  cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
      secure: process.env.SECURE_COOKIES || false,
  },
  resave: false,
  saveUninitialized: true,
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfiguration));

server.get('/', (req, res) => {
  res.status(200).json({message: 'Working'})
})
server.use('/api/auth', authRouter);


module.exports = server
