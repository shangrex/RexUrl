const express = require('express')
const bodyParser = require('body-parser')
const shorten = require('./routes/shorten.js')
require('dotenv').config()

const app = express()
const port = process.env.port

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// include static file
app.use(express.static('./public'));

app.set('view engine', 'ejs')

app.get('/', (_req, res) => {
	res.render('home')
})

shorten(app);

console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
console.log(process.env.dialect);
console.log(process.env.db_port);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
