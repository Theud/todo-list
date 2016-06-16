var express = require('express');
var app = express();                              
var mongoose = require('mongoose');                   
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 

// configuration =================
mongoose.connect('mongodb://localhost:27017/todos')

app.use(express.static(__dirname + '/app'));                 
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

// Model for a Todo
var Todo = mongoose.model('Todo', {
	name : String,
	done : Boolean
});

// Get all Todos
app.get('/api/todos', function(req, res) {
	getAll(null,res);
});

// Create todo
app.post('/api/todos', function(req, res) {

	Todo.create({
		name : req.body.name,
		done : false
	}, function(err, todo) {
		getAll(err,res);
	});

});

// Delete todo
app.delete('/api/todos/delete/:todo_id', function(req, res) {
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		getAll(err,res);
	});
});

// Update todo to "done"
app.get('/api/todos/check/:todo_id', function(req, res) {
	Todo.findOneAndUpdate(
		{_id : req.params.todo_id}, 
		{done : true}, 
		{upsert:true}, 
		function(err, todo) {
			getAll(err,res);
	});
});

// Get all Todo
function getAll(err,res) {
	// Return error
	if (err)
	{
		res.send(err);
	}
	
	// Return all todos
	Todo.find(function(err, todos) {
		if (err)
		{
			res.send(err)
		}
		res.json(todos);
	});
}

app.get('*', function(req, res) {
	res.sendfile('./app/index.html'); // Single page Angular
});

app.listen(8080);
console.log("App listening on port 8080");