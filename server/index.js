require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController') 

const app = express()

const {SERVER_PORT, SESSION_SECRET} = process.env

// MIDDLEWARE
app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use(checkForSession)

// ENDPOINTS
// Auth
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)
// Swag
app.get('/api/swag', swagCtrl.read)

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} puppies on parade`)
})