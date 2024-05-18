const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()


const app = express()
const port = 3000

app.use('/',express.static('public'))

app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())

app.use('/user', require('./router/user'))

app.listen(port,()=>{
    console.log(`listen in port ${port}`)
})
