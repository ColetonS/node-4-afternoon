require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController') 
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

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
app.use(express.static(`${__dirname}/../build`))

// ENDPOINTS
// Auth
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)
// Swag
app.get('/api/swag', swagCtrl.read)
// Cart
app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.delete)
// Search
app.get('/api/search', searchCtrl.search)

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} puppies on parade`)
})