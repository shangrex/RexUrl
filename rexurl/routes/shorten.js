const crypto = require('crypto');
const Url = require('../models/url')
require('dotenv').config()

domain_url = process.env.domain_url

const input_url = async (req, res, next) => {
	console.log("received the input value: ", req.body.url)
	hash_url = encrypt(req.body.url)
	res.send(domain_url+"/rexurl/"+hash_url)
	insert(req.body.url)
};

// when input short URL
const output_url = async (req, res)=>{
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
};


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

module.exports = (app) => {
	app.post("/input", input_url);
	app.get("/rexurl/:hash", output_url);
};