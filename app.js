const express = require('express')
const bodyParser = require('body-parser')
const shorten = require('./routes/shorten.js')

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// include static file
app.use(express.static('./public'));

app.set('view engine', 'ejs')

app.get('/', (_req, res) => {
	res.render('home')
})

shorten(app);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
