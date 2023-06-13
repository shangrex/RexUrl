const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto');

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// include static file
app.use(express.static('./public'));


app.set('view engine', 'ejs')

// init database
const Url = require('./models/url')
domain_url = process.env.domain_url

app.get('/', (_req, res) => {
	res.render('home')
})

app.post('/input', (req, res) => {
	console.log("received the input value: ", req.body.url)
	hash_url = encrypt(req.body.url)
	res.send(domain_url+"/rexurl/"+hash_url)
	insert(req.body.url)
})

// when input short URL
app.get('/rexurl/:hash', (req, res)=>{
	console.log("get key", req.params.hash);
	// res.send(req.params.key)
	var _hash = req.params.hash;
	console.log("search url", domain_url+"/rexurl/"+req.params.hash);
	async function search(_hash){
		const rst = await Url.findOne( 
			{
			where: 
			{ short_url: _hash}
		}, 
		);
		res.redirect(rst.true_url)
	}
	
	search(_hash)
	
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

function encrypt(input_url) {
	var hash_url = crypto.createHash('sha256').update(input_url).digest('hex').slice(-6); 
	return hash_url;
}

async function insert(input_url){
	var test_url;
	 
	await Url.count(
			{
				where : {
					true_url: input_url
				}
			}
			).then(count=>{
				if(count == 0){
					var hash = encrypt(input_url); 
					// hash = domain_url+"/rexurl/"+hash;
					test_url =  Url.create({ true_url: input_url, short_url: hash });
					console.log("new insert", hash);
				}
				else {
					console.log("already exist", input_url)
					test_url = Url.findOne(
						{
							where: 
							{ true_url: input_url}
						},
					)
				}
				return test_url;
			}).then(function final(test_url){
				console.log("generated", test_url.true_url, test_url.short_url);
			}
			);
}
