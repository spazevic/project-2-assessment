//require modules
let express = require('express');
let methodOverride = require('method-override')
let db = require('./models')

let app = express()

app.set('view engine', 'ejs')

app.use(express.static('static'));

app.use(methodOverride('_method'))

app.use(express.urlencoded({extended:false}))

app.get('/', (req,res) => {
	db.widget.findAll()
	.then(widgets => {
		res.render('home', {widgets})
	})
	.catch(err => {
		console.log(err)
	})
	
})

app.post('/', (req,res) => {
	db.widget.create({
		description: req.body.description,
		quantity: req.body.quantity
	})
	.then(widget => {
		res.redirect('/')
	})
	.catch(err => {
		console.log(err)
	})
	
	
})


app.delete('/:id', (req,res) => {
	db.widget.destroy({
		where: {id: req.params.id}
	})
	.then(() => {
		res.redirect('/')
	

	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

app.listen(3000)